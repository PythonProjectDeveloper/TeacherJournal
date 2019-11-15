import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { map } from 'lodash';
import { IDropDown, DROPDOWN, ICollapse, COLLAPSE, DROPDOWN_WIDGET, IDropDownWidget } from '../entities/dropdown';
import { getCollapseState } from '../../helpers/calculations';

export function createDropDownWidgetForm({ dropdowns }: IDropDownWidget = DROPDOWN_WIDGET): FormGroup {
  return new FormGroup({
    dropdowns: new FormArray(map(dropdowns, dropdown => new FormControl(dropdown))),
  });
}

export function createDropDownForm({ subjectName, dates, state = false, isExpended = false }: IDropDown = DROPDOWN): FormGroup {
  const form: FormGroup = new FormGroup({
    subjectName: new FormControl(subjectName, [ Validators.required, Validators.maxLength(50) ]),
    dates: new FormArray(map(dates, createCollapseForm)),
    state: new FormControl(getCollapseState(dates)),
    isExpended: new FormControl(isExpended),
  });

  form.valueChanges.subscribe(val => {
    const subTreeState: boolean = getCollapseState(val.dates);

    // if the state changed when clicked
    if (val.state !== subTreeState) {
      val.dates.forEach(date => date.state = val.state);

    // if the state changed when the children changed
    } else {
      val.state = subTreeState;
    }

    form.patchValue(val, {emitEvent: false, onlySelf: false});
  });

  return form;
}

export function createCollapseForm({ name, state }: ICollapse = COLLAPSE): FormGroup {
  const form: FormGroup = new FormGroup({
    name: new FormControl(name, [ Validators.required, Validators.maxLength(20) ]),
    state: new FormControl(state),
  });

  form.valueChanges.subscribe((val) => {
    form.patchValue(val, { emitEvent: false, onlySelf: false });

    const grandfatherValue: any = form.parent.parent.value;
    grandfatherValue.state = getCollapseState(grandfatherValue.dates);
    form.parent.parent.patchValue(grandfatherValue, {emitEvent: false});
  });

  return form;
}
