import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComponentCanDeactivate } from 'src/app/common/guards/exit-about.guard';
import { Observable, Subject as RXJSSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/common/models/subject';
import { Teacher } from 'src/app/common/models/person';
import { Store } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { createSubject, updateSubject, loadSubject } from 'src/app/redux/actions/subjects';
import { getSubject } from 'src/app/redux/selectors/subjects';
import { loadTeachers } from 'src/app/redux/actions/teachers';
import { getTeachers } from 'src/app/redux/selectors/teachers';
import { selectWithDestroyFlag, setDestroyFlag } from 'src/app/common/helpers/ngrx-widen';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent implements ComponentCanDeactivate, OnInit, OnDestroy {
  public teachers: Teacher[];
  public storedSubject: Subject;
  public formSubject: Subject;
  public isEditForm: boolean;
  public destroy$: RXJSSubject<boolean> = new RXJSSubject<boolean>();

  constructor(
    private store: Store<IGlobalState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.setSubjects = this.setSubjects.bind(this);
    this.setTeachers = this.setTeachers.bind(this);
  }

  public ngOnInit(): void {
    selectWithDestroyFlag(this.store, this.destroy$, getSubject).subscribe(this.setSubjects);
    selectWithDestroyFlag(this.store, this.destroy$, getTeachers).subscribe(this.setTeachers);
    setDestroyFlag(this.route.params, this.destroy$).subscribe(({ id }) => {
      this.store.dispatch(loadSubject({ id }));
      this.store.dispatch(loadTeachers());

      this.isEditForm = Boolean(id);
    });
  }

  public canDeactivate(): boolean | Observable<boolean> {
    return this.formSubject.isEqual(this.storedSubject);
  }

  public onSave(): void {
    if (!this.formSubject.isValid()) { return; }

    if (this.isEditForm) {
      this.store.dispatch(updateSubject(this.formSubject));
    } else {
      this.isEditForm = true;
      this.store.dispatch(createSubject(this.formSubject));
    }
  }

  public setSubjects(storageSubject: Subject): void {
    this.formSubject = storageSubject.getCopy();
    this.storedSubject = storageSubject;

    if (this.isEditForm) {
      this.router.navigate(['subjects', 'subject', 'edit', this.formSubject.id]);
    }
  }

  public setTeachers(teachers: Teacher[]): void {
    this.teachers = teachers;
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
