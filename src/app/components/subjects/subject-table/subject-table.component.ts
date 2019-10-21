import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { ComponentCanDeactivate } from 'src/app/common/guards/exit-about.guard';
import { Observable, Subject as RXJSSubject } from 'rxjs';
import { Journal } from 'src/app/common/models/journal';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'src/app/common/models/subject';
import { IAverageMarkColor } from 'src/app/common/directives/average-mark-highlight.directive';
import { takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { getJournal, getSubject } from 'src/app/redux/selectors/subjects';
import { loadJournal, updateJournal } from 'src/app/redux/actions/subjects';
import { selectWithDestroyFlag, setDestroyFlag } from 'src/app/common/helpers/ngrx-widen';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.scss']
})
export class SubjectTableComponent implements ComponentCanDeactivate, OnInit, OnDestroy {
  public isTableDataChanged = false;
  public storedJournal: Journal;
  public formJournal: Journal;
  public subject: Subject;
  public destroy$: RXJSSubject<boolean> = new RXJSSubject<boolean>();
  public averageMarkColors: IAverageMarkColor[] = [
    { maxAverageMark: 5, class: 'table-wrapper__row__average-mark-lt-5' },
    { maxAverageMark: 11, class: 'table-wrapper__row__average-mark-lt-11' }
  ];

  constructor(
    private store: Store<IGlobalState>,
    private route: ActivatedRoute
  ) {
    this.setJournal = this.setJournal.bind(this);
    this.setSubject = this.setSubject.bind(this);
  }

  public ngOnInit(): void {
    selectWithDestroyFlag(this.store, this.destroy$, getJournal).subscribe(this.setJournal);
    selectWithDestroyFlag(this.store, this.destroy$, getSubject).subscribe(this.setSubject);
    setDestroyFlag(this.route.params, this.destroy$).subscribe(({ id }) => {
      this.store.dispatch(loadJournal({ id }));
    });
  }

  public canDeactivate(): boolean | Observable<boolean> {
    return !this.isJournalChanged();
  }

  public onSave(): void {
    this.store.dispatch(updateJournal(this.formJournal));
  }

  public setJournal(storedJournal: Journal): void {
    this.formJournal = storedJournal.getCopy();
    this.storedJournal = storedJournal;
    this.isTableDataChanged = false;
  }

  public setSubject(subject: Subject): void {
    this.subject = subject;
  }

  public onAddColumn(): void {
    this.formJournal.addColumn();
  }

  public onRemoveColumn(index: number): void {
    this.formJournal.removeColumn(index);
    this.setSaveButtonVision();
  }

  public onChangeHeaderCell(event: FocusEvent, index: number): void {
    this.formJournal.updateDayName(index, (event.target as HTMLInputElement).value);
    this.setSaveButtonVision();
  }

  public onChangeSimpleCell(event: FocusEvent, studentId: string, index: number): void {
    this.formJournal.updateMark(studentId, index, (event.target as HTMLInputElement).value);
    this.setSaveButtonVision();
  }

  public setSaveButtonVision(): void {
    this.isTableDataChanged = this.isJournalChanged();
  }

  public isJournalChanged(): boolean {
    return !this.formJournal.isEqual(this.storedJournal);
  }

  public trackByIndex(index: number): number {
    return index;
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
