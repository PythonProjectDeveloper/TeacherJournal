import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { createSubjectForm } from './subject';
import { IMarkState, MARK_STATE, IDayState, DAY_STATE, JOURNAL_STATE, IJournalState } from '../entities/journal';
import { map } from 'lodash';
import { createPersonForm } from './person';

export function createJournalForm({ _id, subject, students, days }: IJournalState = JOURNAL_STATE): FormGroup {
  return new FormGroup({
    _id: new FormControl(_id, [ Validators.maxLength(24) ]),
    subject: createSubjectForm(subject),
    students: new FormArray(map(students, createPersonForm)),
    days: new FormArray(map(days, createDayForm))
  });
}

export function createDayForm({ _id, name, marks }: IDayState = DAY_STATE): FormGroup {
  return new FormGroup({
    _id: new FormControl(_id, [ Validators.maxLength(24) ]),
    name: new FormControl(name, [ Validators.maxLength(20), Validators.pattern(/^(\d+\/){1,2}\d+$/), Validators.required ]),
    marks: new FormArray(map(marks, createMarkForm))
  });
}

export function createMarkForm({ _id, student, value }: IMarkState = MARK_STATE): FormGroup {
  return new FormGroup({
    _id: new FormControl(_id, [ Validators.maxLength(24) ]),
    student: new FormControl(student, [ Validators.maxLength(24) ]),
    value: new FormControl(value, [ Validators.min(0), Validators.max(10) ])
  });
}
