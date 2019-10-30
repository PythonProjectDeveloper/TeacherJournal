import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormBuilder } from '@angular/forms';
import { IDate } from 'src/app/common/entities/subject-dates';

@Component({
  selector: 'app-dropdown-collapse',
  templateUrl: './dropdown-collapse.component.html',
  styleUrls: ['./dropdown-collapse.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownCollapseComponent),
      multi: true
    }
  ]
})
export class DropdownCollapseComponent implements OnInit, ControlValueAccessor {
  public data: FormGroup;
  public childChanged = false;

  constructor(
    private fb: FormBuilder
  ) { }

  public ngOnInit(): void {
  }

  public onChange: any = () => { };
  public onTouched: any = () => { };

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(data: any): void {
    this.data = this.getSubjectDatesControl(data);
  }

  public changePanelState(subjectDate: FormGroup, flag: boolean): void {
    const value: any = subjectDate.value;
    value.isExpended = flag;

    subjectDate.setValue(value);
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

      this.childChanged = false;

      this.onChange(this.data.value);
    });

    return formGroup;
  }

  public getWrapChecked(dates: IDate[]): boolean | null {
    const quantity: number = dates.reduce((acc, date) => date.state ? acc + 1 : acc, 0);

    if (quantity === 0) { return false; }
    if (quantity === dates.length) { return true; }

    return null;
  }
}
