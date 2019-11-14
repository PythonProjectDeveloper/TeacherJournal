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
import { find, map, isEqual } from 'lodash';
import { IDay, IJournal } from 'src/app/common/entities/journal';
import { createJournalForm, createDayForm } from 'src/app/common/forms/journal';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.scss']
})
export class SubjectTableComponent implements ComponentCanDeactivate, OnInit, OnDestroy {
  public isTableDataChanged = false;
  public journal: IJournal;
  public form: FormGroup;
  public destroy$: RXJSSubject<boolean> = new RXJSSubject<boolean>();
  public averageMarkColors: IAverageMarkColor[] = [
    { maxAverageMark: 5, class: 'table-wrapper__row__average-mark-lt-5' },
    { maxAverageMark: 11, class: 'table-wrapper__row__average-mark-lt-11' }
  ];

  constructor(
    private store: Store<IGlobalState>,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    selectWithDestroyFlag(this.store, this.destroy$, getJournal).subscribe(journal => {
      this.journal = journal;
      this.form = createJournalForm(journal);

      this.isTableDataChanged = false;
    });
    setDestroyFlag(this.route.params, this.destroy$).subscribe(({ id }) => {
      this.store.dispatch(loadJournal({ id }));
    });
  }

  public canDeactivate(): boolean | Observable<boolean> {
    return !this.isJournalChanged();
  }

  public onSave(): void {
    this.store.dispatch(updateJournal(this.form.value));
  }

  public onAddColumn(): void {
    const newDay: IDay = {
      name: '',
      marks: map(this.journal.students, student => ({ student: student._id, value: null }))
    };

    (<FormArray>this.form.get('days')).push(createDayForm(newDay));
  }

  public onRemoveColumn(index: number): void {
    (<FormArray>this.form.get('days')).removeAt(index);

    this.setSaveButtonVision();
  }

  public setSaveButtonVision(): void {
    this.isTableDataChanged = this.isJournalChanged();
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
    const days: FormArray = (<FormArray>this.form.get('days'));
    const day: FormGroup = (<FormGroup>days.controls[dayIdx]);
    const marks: FormArray = (<FormArray>day.get('marks'));
    const mark: FormGroup = (<FormGroup>marks.controls[markIdx]);

    return mark;
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
