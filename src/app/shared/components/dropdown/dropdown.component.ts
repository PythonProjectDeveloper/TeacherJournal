import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataPickerService } from 'src/app/common/services/data-picker.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ISubjectDates } from 'src/app/common/entities/subject-dates';
import { setDestroyFlag } from 'src/app/common/helpers/ngrx-widen';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, OnDestroy {
  public DEFAULT_PRINT_DATES = 'Select a date';
  public form: FormGroup;
  public viewDates: string;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public isInputOpen = false;

  constructor(
    private dataPickerService: DataPickerService,
    private fb: FormBuilder
  ) { }

  public ngOnInit(): void {
    const subjectDates$: Observable<ISubjectDates[]> = this.dataPickerService.getSubjectDates();
    setDestroyFlag(subjectDates$, this.destroy$).subscribe(dates => {
      this.form = this.fb.group({
        subjectDates: this.fb.array(dates.map(subjectDates => subjectDates))
      });
      this.form.valueChanges.subscribe(() => this.updateViewDates(this.form.value.subjectDates));

      this.updateViewDates(dates);
    });

  }

  public updateViewDates(dates: ISubjectDates[]): void {
    const viewDates: string[] = dates.reduce((acc, subjectDate) => {
      const selectedDates: string[] = subjectDate.dates.reduce((dateArray, currentDate) =>
        currentDate.state ? dateArray.concat([currentDate.name]) : dateArray
      , []);

      const selectedDateString: string = `${subjectDate.subjectName}: ${selectedDates.join(';')}`;
      if (selectedDates.length) { acc.push(selectedDateString); }

      return acc;
    }, []);

    this.viewDates = viewDates.length ? viewDates.join(' ') : this.DEFAULT_PRINT_DATES;
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public toggleCheckboxs(flag: boolean): void {
    const value: any = this.form.value;
    value.subjectDates.forEach(subjectDate =>
      subjectDate.dates.forEach(date => date.state = flag)
    );
    this.form.setValue(value);
  }

  public toggleCollapses(flag: boolean): void {
    const value: any = this.form.value;
    value.subjectDates.forEach(subjectDate => subjectDate.isExpended = flag);
    this.form.setValue(value);
  }

  public toggleInput(flag: boolean): void {
    this.isInputOpen = flag;
  }

}
