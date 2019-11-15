import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormBuilder } from '@angular/forms';
import { createCollapseForm, createDropDownForm } from 'src/app/shared/common/forms/dropdown';
import { getCollapseState } from 'src/app/shared/helpers/calculations';


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
  public form: FormGroup;
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
    this.form = this.getSubjectDatesControl(data);
  }

  public changePanelState(form: FormGroup, flag: boolean): void {
    form.value.isExpended = flag;

    form.patchValue(form.value);
  }

  public getSubjectDatesControl(dropdowns: any): FormGroup {
    let lastState: boolean = getCollapseState(dropdowns.dates);
    const formGroup: FormGroup = this.fb.group({
      subjectName: dropdowns.subjectName,
      state: lastState,
      isExpended: dropdowns.isExpended || false,
      dates: this.fb.array(dropdowns.dates.map(date => this.getDateControl(date)))
    });
    // const formGroup: FormGroup = createDropDownForm(dropdowns);

    formGroup.valueChanges.subscribe(val => {
      if (lastState === val.state) { return; }

      if (!this.childChanged) {
        val.dates.forEach(date => date.state = val.state);
      }

      lastState = val.state;
      formGroup.patchValue(val, {emitEvent: false, onlySelf: true});
      //, {emitEvent: false, onlySelf: true}
    });

    return formGroup;
  }

  public getDateControl(date: any): FormGroup {
    let lastState: boolean = date.state;

    const formGroup: FormGroup = createCollapseForm(date);

    formGroup.valueChanges.subscribe((val) => {
      if (lastState === val.state) { return; }

      this.childChanged = true;

      lastState = val.state;
      formGroup.patchValue(val);
      const grandfatherValue: any = formGroup.parent.parent.value;
      grandfatherValue.state = getCollapseState(grandfatherValue.dates);
      formGroup.parent.parent.patchValue(grandfatherValue);

      this.childChanged = false;

      this.onChange(this.form.value, {emitEvent: false, onlySelf: true});
    });

    return formGroup;
  }
}
