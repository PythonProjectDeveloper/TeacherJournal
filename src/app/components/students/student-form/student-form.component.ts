import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentCanDeactivate } from 'src/app/common/guards/exit-about.guard';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { loadStudent, createStudent, updateStudent } from 'src/app/redux/actions/students';
import { getStudent } from 'src/app/redux/selectors/students';
import { selectWithDestroyFlag, setDestroyFlag } from 'src/app/common/helpers/ngrx-widen';
import { BannerService } from 'src/app/common/services/banner.service';
import { PersonForm } from 'src/app/common/forms/person';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IPerson } from 'src/app/common/entities/person';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements ComponentCanDeactivate, OnInit, OnDestroy {
  public person: IPerson;
  public form: FormGroup = PersonForm;
  public isEditForm: boolean;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store<IGlobalState>,
    private route: ActivatedRoute,
    private router: Router,
    private bunnerService: BannerService
  ) { }

  public ngOnInit(): void {
    selectWithDestroyFlag(this.store, this.destroy$, getStudent).subscribe(person => {
      this.person = person;
      this.form.setValue(person);

      if (this.isEditForm) {
        this.router.navigate(['students', 'student', 'edit', person._id]);
      }
    });
    setDestroyFlag(this.route.params, this.destroy$).subscribe(({ id }) => {
      this.store.dispatch(loadStudent({ id }));

      this.isEditForm = Boolean(id);
    });
  }

  public canDeactivate(): boolean | Observable<boolean> {
    return isEqual(this.form.value, this.person);
  }

  public onSave(): void {
    if (!this.form.valid) { return; }

    if (this.isEditForm) {
      this.store.dispatch(updateStudent(this.form.value));
    } else {
      this.isEditForm = true;
      this.store.dispatch(createStudent(this.form.value));
    }

    this.bunnerService.setBannerStatus(true);
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
