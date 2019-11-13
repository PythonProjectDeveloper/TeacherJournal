import { FormControl, FormGroup, Validators } from '@angular/forms';

// tslint:disable-next-line: variable-name
export let PersonForm: FormGroup = new FormGroup({
  _id: new FormControl('', [ Validators.maxLength(24) ]),
  firstName: new FormControl('', [ Validators.required, Validators.maxLength(50) ]),
  lastName: new FormControl('', [ Validators.required, Validators.maxLength(50) ]),
  address: new FormControl('', [ Validators.maxLength(50) ]),
  description: new FormControl('', [ Validators.maxLength(200) ])
});
