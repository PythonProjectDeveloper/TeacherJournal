import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { createSubjectForm } from './subject';
import { IMark, MARK, IDay, DAY, JOURNAL, IJournal } from '../entities/journal';
import { map } from 'lodash';
import { createPersonForm } from './person';

export function createJournalForm({ _id, subject, students, days }: IJournal = JOURNAL): FormGroup {
  return new FormGroup({
    _id: new FormControl(_id, [ Validators.maxLength(24) ]),
    subject: createSubjectForm(subject),
    students: new FormArray(map(students, createPersonForm)),
    days: new FormArray(map(days, createDayForm))
  });
}

export function createDayForm({ name, marks }: IDay = DAY): FormGroup {
  return new FormGroup({
    name: new FormControl(name, [ Validators.maxLength(20) ]),
    marks: new FormArray(map(marks, createMarkForm))
  });
}

export function createMarkForm({ student, value }: IMark = MARK): FormGroup {
  return new FormGroup({
    student: new FormControl(student, [ Validators.maxLength(24) ]),
    value: new FormControl(value, [ Validators.min(0), Validators.max(10) ])
  });
}
