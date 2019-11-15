import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { map } from 'lodash';
import { IDropDown, DROPDOWN, ICollapse, COLLAPSE, DROPDOWN_WIDGET, IDropDownWidget } from '../entities/dropdown';

export function createDropDownWidgetForm({ dropdowns }: IDropDownWidget = DROPDOWN_WIDGET): FormGroup {
  return new FormGroup({
    dropdowns: new FormArray(map(dropdowns, dropdown => new FormControl(dropdown))),
  });
}

export function createDropDownForm({ subjectName, dates, state = false, isExpended = false }: IDropDown = DROPDOWN): FormGroup {
  return new FormGroup({
    subjectName: new FormControl(subjectName, [ Validators.required, Validators.maxLength(50) ]),
    dates: new FormArray(map(dates, createCollapseForm)),
    state: new FormControl(state),
    isExpended: new FormControl(isExpended),
  });
}

export function createCollapseForm({ name, state }: ICollapse = COLLAPSE): FormGroup {
  return new FormGroup({
    name: new FormControl(name, [ Validators.required, Validators.maxLength(20) ]),
    state: new FormControl(state),
  });
}
