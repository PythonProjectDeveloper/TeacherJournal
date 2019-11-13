import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { ComponentCanDeactivate } from 'src/app/common/guards/exit-about.guard';
import { Observable, Subject as RXJSSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IAverageMarkColor } from 'src/app/common/directives/average-mark-highlight.directive';
import { Store } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { getJournal } from 'src/app/redux/selectors/subjects';
import { loadJournal, updateJournal } from 'src/app/redux/actions/subjects';
import { selectWithDestroyFlag, setDestroyFlag } from 'src/app/common/helpers/ngrx-widen';
import { find, map, isEqual, cloneDeep } from 'lodash';
import { IDay, IJournal } from 'src/app/common/entities/journal';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.scss']
})
export class SubjectTableComponent implements ComponentCanDeactivate, OnInit, OnDestroy {
  public isTableDataChanged = false;
  public storedJournal: IJournal;
  public formJournal: IJournal;
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
  }

  public ngOnInit(): void {
    selectWithDestroyFlag(this.store, this.destroy$, getJournal).subscribe(this.setJournal);
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

  public setJournal(storedJournal: IJournal): void {
    this.formJournal = cloneDeep(storedJournal);
    this.storedJournal = storedJournal;
    this.isTableDataChanged = false;
  }

  public onAddColumn(): void {
    const newDay: IDay = {
      name: '',
      marks: map(this.formJournal.students, student => ({ student: student._id, value: null }))
    };

    this.formJournal.days.push(newDay);
  }

  public onRemoveColumn(index: number): void {
    this.formJournal.days.splice(index, 1);

    this.setSaveButtonVision();
  }

  public setSaveButtonVision(): void {
    this.isTableDataChanged = this.isJournalChanged();
  }

  public isJournalChanged(): boolean {
    return !isEqual(this.formJournal, this.storedJournal);
  }

  public getStudentMarks(id: string, days: any): number {
    return days.map(day => parseInt(find(day.marks, { student: id }).value, 10));
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

    // public isEqual(other: IJournal): boolean {
  //   const isIdEqual: boolean = this._id === other._id;
  //   const isDayNamesEqual: boolean = _.isEqual(
  //     dropLastEmptyItems(this.dayNames),
  //     dropLastEmptyItems(other.dayNames)
  //   );

  //   for (const index of Object.keys(this.studentMarks)) {
  //     const isMarksEqual: boolean = _.isEqual(
  //       dropLastEmptyItems(this.studentMarks[index].marks),
  //       dropLastEmptyItems(other.studentMarks[index].marks)
  //     );

  //     if (!isMarksEqual) { return isMarksEqual; }
  //   }

  //   return isIdEqual && isDayNamesEqual;
  // }

  // public isValid(): boolean {
  //   return this.days.reduce((isFill, day) => isFill ? Boolean(day.name) : isFill, true);
  // }
}
