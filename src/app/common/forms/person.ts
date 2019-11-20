import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPersonState, PERSON_STATE } from '../entities/person';
import { ID_LENGTH, SHORT_TEXT_LENGTH, LONG_TEXT_LENGTH } from '../constants/constants-forms';

export function createPersonForm({ _id, firstName, lastName, address, description }: IPersonState = PERSON_STATE): FormGroup {
  return new FormGroup({
    _id: new FormControl(_id, [ Validators.maxLength(ID_LENGTH) ]),
    firstName: new FormControl(firstName, [ Validators.required, Validators.maxLength(SHORT_TEXT_LENGTH) ]),
    lastName: new FormControl(lastName, [ Validators.required, Validators.maxLength(SHORT_TEXT_LENGTH) ]),
    address: new FormControl(address, [ Validators.maxLength(SHORT_TEXT_LENGTH) ]),
    description: new FormControl(description, [ Validators.maxLength(LONG_TEXT_LENGTH) ])
  });
}
