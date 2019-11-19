import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPersonState, PERSON_STATE } from '../entities/person';

export function createPersonForm({ _id, firstName, lastName, address, description }: IPersonState = PERSON_STATE): FormGroup {
  return new FormGroup({
    _id: new FormControl(_id, [ Validators.maxLength(24) ]),
    firstName: new FormControl(firstName, [ Validators.required, Validators.maxLength(50) ]),
    lastName: new FormControl(lastName, [ Validators.required, Validators.maxLength(50) ]),
    address: new FormControl(address, [ Validators.maxLength(50) ]),
    description: new FormControl(description, [ Validators.maxLength(200) ])
  });
}
