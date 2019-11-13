import { FormControl, FormGroup, Validators } from '@angular/forms';

// tslint:disable-next-line: variable-name
export const SubjectForm: FormGroup = new FormGroup({
  name: new FormControl('', [ Validators.required, Validators.maxLength(50) ]),
  teacher: new FormControl('', [ Validators.required, Validators.maxLength(50) ]),
  cabinet: new FormControl('', [ Validators.maxLength(50) ]),
  description: new FormControl('', [ Validators.maxLength(200) ])
});
