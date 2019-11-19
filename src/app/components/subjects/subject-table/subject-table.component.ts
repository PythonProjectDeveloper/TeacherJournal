import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ComponentCanDeactivate } from 'src/app/common/guards/exit-about.guard';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IAverageMarkColor } from 'src/app/common/directives/average-mark-highlight.directive';
import { Store } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { getJournal } from 'src/app/redux/selectors/subjects';
import { loadJournal, updateJournal } from 'src/app/redux/actions/subjects';
import { find, map, isEqual } from 'lodash';
import { IDayState, IJournalState } from 'src/app/common/entities/journal';
import { createJournalForm, createDayForm } from 'src/app/common/forms/journal';
import { FormGroup, FormArray } from '@angular/forms';
import { EventDestroyer } from 'src/app/shared/entities/event-destroyer';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.scss']
})
export class SubjectTableComponent extends EventDestroyer implements ComponentCanDeactivate, OnInit {
  public canDataBeSave = false;
  public journal: IJournalState;
  public form: FormGroup;
  public averageMarkColors: IAverageMarkColor[] = [
    { maxAverageMark: 5, class: 'table-wrapper__row__average-mark-lt-5' },
    { maxAverageMark: 11, class: 'table-wrapper__row__average-mark-lt-11' }
  ];

  get days(): FormArray { return this.form.controls.days as FormArray; }

  constructor(
    private store: Store<IGlobalState>,
    private route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.selectWithDestroyFlag(this.store, getJournal).subscribe(journal => {
      this.journal = journal;
      this.form = createJournalForm(journal);

      this.setDestroyFlag(this.form.valueChanges).subscribe(val => {
        this.setSaveButtonVision();
      });

      this.canDataBeSave = false;
    });
    this.setDestroyFlag(this.route.params).subscribe(({ id }) => {
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
    const newDay: IDayState = {
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

  public getMarkControl(dayIdx: string, markIdx: string): FormGroup {
    const day: FormGroup = (<FormGroup>this.days.controls[dayIdx]);
    const marks: FormArray = (<FormArray>day.controls.marks);
    const mark: FormGroup = (<FormGroup>marks.controls[markIdx]);

    return mark;
  }
}
