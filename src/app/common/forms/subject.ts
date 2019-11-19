import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISubjectState, SUBJECT_STATE } from '../entities/subject';

export function createSubjectForm({ _id, name, teacher, cabinet, description }: ISubjectState = SUBJECT_STATE): FormGroup {
  return new FormGroup({
    _id: new FormControl(_id, [ Validators.maxLength(24) ]),
    name: new FormControl(name, [ Validators.required, Validators.maxLength(50) ]),
    teacher: new FormControl(teacher, [ Validators.required, Validators.maxLength(50) ]),
    cabinet: new FormControl(cabinet, [ Validators.maxLength(50) ]),
    description: new FormControl(description, [ Validators.maxLength(200) ])
  });
}
