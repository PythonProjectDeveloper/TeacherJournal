import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { createSubjectForm } from './subject';
import { map } from 'lodash';
import { createPersonForm } from './person';
import { getAverageMarks } from '../helpers/calculations';
import {
  ID_LENGTH,
  DATE_LENGTH,
  DATE_REGEX,
  MAX_MARK,
  MIN_MARK,
  RADIX,
} from '../constants/constants-forms';
import {
  IMarkState,
  MARK_STATE,
  IDayState,
  DAY_STATE,
  JOURNAL_STATE,
  IJournalState,
  AVERAGE_MARK_STATE,
  IAverageMarkState,
} from '../entities/journal';

export function createJournalForm({ _id, subject, students, days, averageMarks }: IJournalState = JOURNAL_STATE): FormGroup {

  const form: FormGroup = new FormGroup({
    _id: new FormControl(_id, [ Validators.maxLength(ID_LENGTH) ]),
    subject: createSubjectForm(subject),
    students: new FormArray(map(students, createPersonForm)),
    days: new FormArray(map(days, createDayForm)),
    averageMarks: new FormArray(map(averageMarks, createAverageMarkForm)),
  });

  form.valueChanges.subscribe(newValue => {
    form.controls.averageMarks.patchValue(getAverageMarks(newValue.days), { emitEvent: false });
  });

  return form;
}

export function createDayForm({ _id, name, marks }: IDayState = DAY_STATE): FormGroup {
  return new FormGroup({
    _id: new FormControl(_id, [ Validators.maxLength(ID_LENGTH) ]),
    name: new FormControl(name, [ Validators.maxLength(DATE_LENGTH), Validators.pattern(DATE_REGEX), Validators.required ]),
    marks: new FormArray(map(marks, createMarkForm))
  });
}

export function createMarkForm({ _id, student, value }: IMarkState = MARK_STATE): FormGroup {
  const form: FormGroup = new FormGroup({
    _id: new FormControl(_id, [ Validators.maxLength(ID_LENGTH) ]),
    student: new FormControl(student, [ Validators.maxLength(ID_LENGTH) ]),
    value: new FormControl(value, [ Validators.min(MIN_MARK), Validators.max(MAX_MARK) ])
  });

  form.controls.value.valueChanges.subscribe(newValue => {
    let processedValue: number = parseInt(newValue, RADIX);

    if (Number.isNaN(processedValue)) {
      processedValue = null;
    } else if (MIN_MARK > processedValue || processedValue > MAX_MARK) {
      processedValue = parseInt(newValue.slice(0, -1), RADIX);
    }

    form.controls.value.setValue(processedValue, { emitEvent: false });
  });

  return form;
}

export function createAverageMarkForm({ _id, student, value, markQuantity }: IAverageMarkState = AVERAGE_MARK_STATE): FormGroup {
  return new FormGroup({
    _id: new FormControl(_id, [ Validators.maxLength(ID_LENGTH) ]),
    student: new FormControl(student, [ Validators.maxLength(ID_LENGTH) ]),
    value: new FormControl(value, [ Validators.min(MIN_MARK), Validators.max(MAX_MARK) ]),
    markQuantity: new FormControl(markQuantity),
  });
}
