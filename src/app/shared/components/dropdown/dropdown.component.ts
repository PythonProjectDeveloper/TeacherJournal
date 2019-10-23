import { Component, OnInit, forwardRef } from '@angular/core';
import { DataPickerService } from 'src/app/common/services/data-picker.service';
import { FormGroup, NG_VALUE_ACCESSOR, FormBuilder, ControlValueAccessor } from '@angular/forms';
import { IDate, ISubjectDates } from 'src/app/common/entities/subject-dates';

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
export class DropdownComponent implements OnInit, ControlValueAccessor {
  public DEFAULT_PRINT_DATES = 'Select a date';
  public form: FormGroup;
  public viewDates: string;

  constructor(
    private dataPickerService: DataPickerService,
    private fb: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.dataPickerService.getSubjectDates().subscribe(dates => {
      this.form = this.fb.group({
        printDates: this.DEFAULT_PRINT_DATES,
        subjectDates: this.fb.array(dates.map(subjectDates => this.getSubjectDatesControl(subjectDates)))
      });
    });
  }

  public getSubjectDatesControl(subjectDates: ISubjectDates): FormGroup {
    return this.fb.group({
      subjectName: subjectDates.subjectName,
      state: this.getWrapChecked(subjectDates.dates),
      dates: this.fb.array(subjectDates.dates.map(date => this.getDateControl(date)))
    });
  }

  public getDateControl(date: IDate): FormGroup {
    return this.fb.group({
      name: date.name,
      state: date.state
    });
  }

  public getWrapChecked(dates: IDate[]): boolean | null {
    const quantity: number = dates.reduce((acc, date) => date.state ? acc + 1 : acc, 0);

    if (quantity === 0) { return false; }
    if (quantity === dates.length) { return true; }

    return null;
  }

  public writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }

  public registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }

  public registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }

  public setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

}
