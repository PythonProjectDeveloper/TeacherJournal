import { FormControl, FormGroup, Validators } from '@angular/forms';

// tslint:disable-next-line: variable-name
export const PersonForm: FormGroup = new FormGroup({
  firstName: new FormControl('', [ Validators.required, Validators.maxLength(50) ]),
  lastName: new FormControl('', [ Validators.required, Validators.maxLength(50) ]),
  address: new FormControl('', [ Validators.maxLength(50) ]),
  description: new FormControl('', [ Validators.maxLength(200) ])
});
