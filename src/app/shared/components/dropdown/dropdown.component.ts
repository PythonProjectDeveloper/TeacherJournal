import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { DataPickerService } from 'src/app/common/services/data-picker.service';
import { FormGroup, NG_VALUE_ACCESSOR, FormBuilder, ControlValueAccessor } from '@angular/forms';
import { IDate, ISubjectDates } from 'src/app/common/entities/subject-dates';
import { Person } from 'src/app/common/models/person';
import { setDestroyFlag } from 'src/app/common/helpers/ngrx-widen';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements OnInit, OnDestroy, ControlValueAccessor {
  public DEFAULT_PRINT_DATES = 'Select a date';
  public form: FormGroup;
  public viewDates: string;
  public students: Person[] = [];
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public childChanged = false;
  public printDates = '';

  constructor(
    private dataPickerService: DataPickerService,
    private fb: FormBuilder
  ) { }

  public ngOnInit(): void {
    const subjectDates$: Observable<ISubjectDates[]> = this.dataPickerService.getSubjectDates();
    setDestroyFlag(subjectDates$, this.destroy$).subscribe(dates => this.setForm(dates));

  }

  public filterPersons(): Person[] {
    return [];
  }

  public getPrintDates(dates: ISubjectDates[]): string {
    const printDates: string[] = dates.reduce((acc, subjectDate) => {
      const selectedDates: string[] = subjectDate.dates.reduce((dates, currentDate) =>
        currentDate.state ? dates.concat([currentDate.name]) : dates
      , []);

      const selectedDateString: string = `${subjectDate.subjectName}: ${selectedDates.join(';')}`;
      if (selectedDates.length) { acc.push(selectedDateString); }

      return acc;
    }, []);

    return printDates.length ? printDates.join(' ') : this.DEFAULT_PRINT_DATES;
  }

  public setForm(dates: ISubjectDates[]): void {
    this.form = this.fb.group({
      subjectDates: this.fb.array(dates.map(subjectDates => this.getSubjectDatesControl(subjectDates)))
    });

    this.printDates = this.getPrintDates(dates);
  }

  public getSubjectDatesControl(subjectDates: any): FormGroup {
    let lastState: boolean = this.getWrapChecked(subjectDates.dates);
    const formGroup: FormGroup = this.fb.group({
      subjectName: subjectDates.subjectName,
      state: lastState,
      isExpended: subjectDates.isExpended || false,
      dates: this.fb.array(subjectDates.dates.map(date => this.getDateControl(date)))
    });

    formGroup.valueChanges.subscribe(val => {
      if (lastState === val.state) { return; }

      if (!this.childChanged) {
        val.dates.forEach(date => date.state = val.state);
      }

      lastState = val.state;
      formGroup.setValue(val);
      this.onChange(this.filterPersons());
    });

    return formGroup;
  }

  public getDateControl(date: IDate): FormGroup {
    let lastState: boolean = date.state;
    const formGroup: FormGroup = this.fb.group({
      name: date.name,
      state: date.state
    });

    formGroup.valueChanges.subscribe((val) => {
      if (lastState === val.state) { return; }

      this.childChanged = true;

      lastState = val.state;
      formGroup.setValue(val);
      const grandfatherValue: any = formGroup.parent.parent.value;
      grandfatherValue.state = this.getWrapChecked(grandfatherValue.dates);
      formGroup.parent.parent.setValue(grandfatherValue);
      this.onChange(this.filterPersons());

      this.childChanged = false;

      this.printDates = this.getPrintDates(this.form.value.subjectDates);
    });

    return formGroup;
  }

  public changePanelState(subjectDate: FormGroup, flag: boolean): void {
    const value: any = subjectDate.value;
    value.isExpended = flag;

    subjectDate.setValue(value);
  }

  public getWrapChecked(dates: IDate[]): boolean | null {
    const quantity: number = dates.reduce((acc, date) => date.state ? acc + 1 : acc, 0);

    if (quantity === 0) { return false; }
    if (quantity === dates.length) { return true; }

    return null;
  }

  public writeValue(students: Person[]): void {
    this.students = students;
  }

  public onChange: any = () => { };
  public onTouched: any = () => { };

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
