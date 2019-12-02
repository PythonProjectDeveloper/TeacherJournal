import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISubjectState, SUBJECT_STATE } from '../entities/subject';
import { ID_LENGTH, SHORT_TEXT_LENGTH, LONG_TEXT_LENGTH } from '../constants/constants-forms';

export function createSubjectForm({ _id, name, teacher, cabinet, description }: ISubjectState = SUBJECT_STATE): FormGroup {
  return new FormGroup({
    _id: new FormControl(_id, [ Validators.maxLength(ID_LENGTH) ]),
    name: new FormControl(name, [ Validators.required, Validators.maxLength(SHORT_TEXT_LENGTH) ]),
    teacher: new FormControl(teacher, [ Validators.required, Validators.maxLength(SHORT_TEXT_LENGTH) ]),
    cabinet: new FormControl(cabinet, [ Validators.maxLength(SHORT_TEXT_LENGTH) ]),
    description: new FormControl(description, [ Validators.maxLength(LONG_TEXT_LENGTH) ])
  });
}
