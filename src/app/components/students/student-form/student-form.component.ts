import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentCanDeactivate } from 'src/app/common/guards/exit-about.guard';
import { Observable, Subscription, Subject } from 'rxjs';
import { Person } from 'src/app/common/models/person';
import { Store, select } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { loadStudent, createStudent, updateStudent } from 'src/app/redux/actions/students';
import { getStudent } from 'src/app/redux/selectors/students';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements ComponentCanDeactivate, OnInit, OnDestroy {
  public storedPerson: Person;
  public formPerson: Person;
  public isEditForm: boolean;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store<IGlobalState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.setPersons = this.setPersons.bind(this);
  }

  public ngOnInit(): void {
    this.store
      .pipe(
        takeUntil(this.destroy$),
        select(getStudent)
      )
      .subscribe(this.setPersons);

    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ id }) => {
        this.store.dispatch(loadStudent({ id }));

        this.isEditForm = Boolean(id);
      });
  }

  public canDeactivate(): boolean | Observable<boolean> {
    return this.formPerson.isEqual(this.storedPerson);
  }

  public onSave(): void {
    if (!this.formPerson.firstName || !this.formPerson.lastName) { return; }

    if (this.isEditForm) {
      this.store.dispatch(updateStudent(this.formPerson));
    } else {
      this.isEditForm = true;
      this.store.dispatch(createStudent(this.formPerson));
    }
  }

  public setPersons(storagePerson: Person): void {
    this.formPerson = storagePerson.getCopy();
    this.storedPerson = storagePerson;

    if (this.isEditForm) {
      this.router.navigate(['students', 'student', 'edit', this.formPerson.id]);
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
