import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentCanDeactivate } from 'src/app/common/guards/exit-about.guard';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { loadStudent, createStudent, updateStudent } from 'src/app/redux/actions/students';
import { getStudent } from 'src/app/redux/selectors/students';
import { BannerService } from 'src/app/common/services/banner.service';
import { createPersonForm } from 'src/app/common/forms/person';
import { FormGroup} from '@angular/forms';
import { IPersonState } from 'src/app/common/entities/person';
import { isEqual } from 'lodash';
import { EventDestroyer } from 'src/app/shared/entities/event-destroyer';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent extends EventDestroyer implements ComponentCanDeactivate, OnInit {
  public person: IPersonState;
  public form: FormGroup;
  public isEditForm: boolean;

  constructor(
    private store: Store<IGlobalState>,
    private route: ActivatedRoute,
    private router: Router,
    private bunnerService: BannerService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.selectWithDestroyFlag(this.store, getStudent).subscribe(person => {
      this.person = person;
      this.form = createPersonForm(person);

      if (this.isEditForm) {
        this.router.navigate(['students', 'student', 'edit', person._id]);
      }
    });
    this.setDestroyFlag(this.route.params).subscribe(({ id }) => {
      this.store.dispatch(loadStudent({ id }));

      this.isEditForm = Boolean(id);
    });
  }

  public canDeactivate(): boolean | Observable<boolean> {
    return isEqual(this.form.value, this.person);
  }

  public onSave(): void {
    if (this.form.invalid) { return; }

    if (this.isEditForm) {
      this.store.dispatch(updateStudent(this.form.value));
    } else {
      this.isEditForm = true;
      this.store.dispatch(createStudent(this.form.value));
    }

    this.bunnerService.setBannerStatus(true);
  }
}
