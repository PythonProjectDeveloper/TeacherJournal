import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { ComponentCanDeactivate } from 'src/app/common/guards/exit-about.guard';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IAverageMarkColor } from 'src/app/common/directives/average-mark-highlight.directive';
import { Store } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { getJournal } from 'src/app/redux/selectors/subjects';
import { loadJournal, updateJournal } from 'src/app/redux/actions/subjects';
import { selectWithDestroyFlag, setDestroyFlag } from 'src/app/common/helpers/ngrx-widen';
import { find, map, isEqual } from 'lodash';
import { IDay, IJournal } from 'src/app/common/entities/journal';
import { createJournalForm, createDayForm } from 'src/app/common/forms/journal';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.scss']
})
export class SubjectTableComponent implements ComponentCanDeactivate, OnInit, OnDestroy {
  public canDataBeSave = false;
  public journal: IJournal;
  public form: FormGroup;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public averageMarkColors: IAverageMarkColor[] = [
    { maxAverageMark: 5, class: 'table-wrapper__row__average-mark-lt-5' },
    { maxAverageMark: 11, class: 'table-wrapper__row__average-mark-lt-11' }
  ];

  get days(): FormArray { return this.form.get('days') as FormArray; }

  constructor(
    private store: Store<IGlobalState>,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    selectWithDestroyFlag(this.store, this.destroy$, getJournal).subscribe(journal => {
      this.journal = journal;
      this.form = createJournalForm(journal);

      setDestroyFlag(this.form.valueChanges, this.destroy$).subscribe(val => {
        this.setSaveButtonVision();
      });

      this.canDataBeSave = false;
    });
    setDestroyFlag(this.route.params, this.destroy$).subscribe(({ id }) => {
      this.store.dispatch(loadJournal({ id }));
    });
  }

  public canDeactivate(): boolean | Observable<boolean> {
    return !this.isJournalChanged();
  }

  public onSave(): void {
    if (this.form.invalid) { return; }

    this.store.dispatch(updateJournal(this.form.value));
  }

  public onAddColumn(): void {
    const newDay: IDay = {
      _id: '',
      name: '',
      marks: map(this.journal.students, student => ({ _id: '', student: student._id, value: null }))
    };

    this.days.push(createDayForm(newDay));
  }

  public onRemoveColumn(index: number): void {
    this.days.removeAt(index);

    this.setSaveButtonVision();
  }

  public setSaveButtonVision(): void {
    this.canDataBeSave = this.isJournalChanged() && this.form.valid;
  }

  public isJournalChanged(): boolean {
    return !isEqual(this.form.value, this.journal);
  }

  public getStudentMarks(id: string, days: any): number {
    return days.map(day => parseInt(find(day.marks, { student: id }).value, 10));
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public getMarkControl(dayIdx: string, markIdx: string): FormGroup {
    const day: FormGroup = (<FormGroup>this.days.controls[dayIdx]);
    const marks: FormArray = (<FormArray>day.get('marks'));
    const mark: FormGroup = (<FormGroup>marks.controls[markIdx]);

    return mark;
  }
}
