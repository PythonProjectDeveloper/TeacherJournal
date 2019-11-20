import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { map } from 'lodash';
import {
  IDropDownState,
  DEFAULT_DROPDOWN_STATE,
  ICollapseState,
  DEFAULT_COLLAPSE_STATE,
  DROPDOWN_WIDGET_STATE,
  IDropDownWidgetState
} from '../entities/dropdown';
import { getCollapseState } from '../helpers/calculations';
import { SHORT_TEXT_LENGTH, DATE_LENGTH } from '../constants/constants-forms';

export function createDropDownWidgetForm({ dropdowns }: IDropDownWidgetState = DROPDOWN_WIDGET_STATE): FormGroup {
  return new FormGroup({
    dropdowns: new FormArray(map(dropdowns, dropdown => new FormControl(dropdown))),
  });
}

export function createDropDownForm({
    subjectName,
    dates,
    state = false,
    isExpended = false,
  }: IDropDownState = DEFAULT_DROPDOWN_STATE): FormGroup {
  const form: FormGroup = new FormGroup({
    subjectName: new FormControl(subjectName, [ Validators.required, Validators.maxLength(SHORT_TEXT_LENGTH) ]),
    dates: new FormArray(map(dates, createCollapseForm)),
    state: new FormControl(getCollapseState(dates)),
    isExpended: new FormControl(isExpended),
  });

  form.controls.state.valueChanges.subscribe(newState => {
    const formDates: ICollapseState[] = form.controls.dates.value;
    const isCollapsed: boolean = getCollapseState(formDates);

    // if the state changed when clicked
    if (newState !== isCollapsed) {
      formDates.forEach(date => date.state = newState);
      form.controls.dates.patchValue(formDates, { emitEvent: false });
    }
  });

  form.controls.dates.valueChanges.subscribe(newDates => {
    const newState: boolean = getCollapseState(newDates);

    form.controls.state.patchValue(newState, { emitEvent: false });
  });

  return form;
}

export function createCollapseForm({ name, state }: ICollapseState = DEFAULT_COLLAPSE_STATE): FormGroup {
  const form: FormGroup = new FormGroup({
    name: new FormControl(name, [ Validators.required, Validators.maxLength(DATE_LENGTH) ]),
    state: new FormControl(state),
  });

  return form;
}
