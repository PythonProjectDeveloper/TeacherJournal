import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { SubjectForm } from './subject';

// tslint:disable-next-line: variable-name
export const JournalForm: FormGroup = new FormGroup({
  _id: new FormControl('', [ Validators.maxLength(24) ]),
  subject: SubjectForm,
  students: new FormArray([]),
  days: new FormArray([]),
});

// tslint:disable-next-line: variable-name
export const DayForm: FormGroup = new FormGroup({
  name: new FormControl('', [ Validators.maxLength(20) ]),
  marks: new FormArray([])
});

// tslint:disable-next-line: variable-name
export const MarkForm: FormGroup = new FormGroup({
  student: new FormControl('', [ Validators.maxLength(24) ]),
  value: new FormControl(null, [ Validators.min(0), Validators.max(10) ])
});
