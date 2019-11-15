import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComponentCanDeactivate } from 'src/app/common/guards/exit-about.guard';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { createSubject, updateSubject, loadSubject } from 'src/app/redux/actions/subjects';
import { getSubject } from 'src/app/redux/selectors/subjects';
import { loadTeachers } from 'src/app/redux/actions/teachers';
import { getTeachers } from 'src/app/redux/selectors/teachers';
import { selectWithDestroyFlag, setDestroyFlag } from 'src/app/common/helpers/ngrx-widen';
import { BannerService } from 'src/app/common/services/banner.service';
import { ISubject } from 'src/app/common/entities/subject';
import { ITeacher } from 'src/app/common/entities/person';
import { isEqual } from 'lodash';
import { createSubjectForm } from 'src/app/common/forms/subject';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent implements ComponentCanDeactivate, OnInit, OnDestroy {
  public teachers: ITeacher[];
  public subject: ISubject;
  public form: FormGroup;
  public isEditForm: boolean;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store<IGlobalState>,
    private route: ActivatedRoute,
    private router: Router,
    private bunnerService: BannerService
  ) { }

  public ngOnInit(): void {
    selectWithDestroyFlag(this.store, this.destroy$, getSubject).subscribe(subject => {
      this.subject = subject;
      this.form = createSubjectForm(subject);

      if (this.isEditForm) {
        this.router.navigate(['subjects', 'subject', 'edit', subject._id]);
      }
    });
    selectWithDestroyFlag(this.store, this.destroy$, getTeachers).subscribe(teachers => this.teachers = teachers);
    setDestroyFlag(this.route.params, this.destroy$).subscribe(({ id }) => {
      this.store.dispatch(loadSubject({ id }));
      this.store.dispatch(loadTeachers());

      this.isEditForm = Boolean(id);
    });
  }

  public canDeactivate(): boolean | Observable<boolean> {
    return isEqual(this.form.value, this.subject);
  }

  public onSave(): void {
    if (this.form.invalid) { return; }

    if (this.isEditForm) {
      this.store.dispatch(updateSubject(this.form.value));
    } else {
      this.isEditForm = true;
      this.store.dispatch(createSubject(this.form.value));
    }

    this.bunnerService.setBannerStatus(true);
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
