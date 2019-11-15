import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';
import { createDropDownForm } from 'src/app/shared/common/forms/dropdown';
import { IDropDown } from 'src/app/shared/common/entities/dropdown';


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
export class DropdownCollapseComponent implements ControlValueAccessor {
  public form: FormGroup;

  public onChange: any = () => { };
  public onTouched: any = () => { };

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(data: IDropDown): void {
    this.form = createDropDownForm(data);
    this.form.valueChanges.subscribe(() => this.onChange(this.form.value));
  }

  public changePanelState(form: FormGroup, flag: boolean): void {
    form.value.isExpended = flag;

    form.patchValue(form.value);
  }
}
