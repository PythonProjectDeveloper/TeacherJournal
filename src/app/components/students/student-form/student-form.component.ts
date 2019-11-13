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
import { IPerson } from 'src/app/common/entities/person';
import { isEqual, cloneDeep } from 'lodash';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements ComponentCanDeactivate, OnInit, OnDestroy {
  public storedPerson: IPerson;
  public formPerson: IPerson;
  public isEditForm: boolean;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store<IGlobalState>,
    private route: ActivatedRoute,
    private router: Router,
    private bunnerService: BannerService
  ) {
    this.setPersons = this.setPersons.bind(this);
  }

  public ngOnInit(): void {
    selectWithDestroyFlag(this.store, this.destroy$, getStudent).subscribe(this.setPersons);
    setDestroyFlag(this.route.params, this.destroy$).subscribe(({ id }) => {
      this.store.dispatch(loadStudent({ id }));

      this.isEditForm = Boolean(id);
    });
  }

  public canDeactivate(): boolean | Observable<boolean> {
    return isEqual(this.formPerson, this.storedPerson);
  }

  public onSave(): void {
    if (!this.formPerson.firstName || !this.formPerson.lastName) { return; }

    if (this.isEditForm) {
      this.store.dispatch(updateStudent(this.formPerson));
    } else {
      this.isEditForm = true;
      this.store.dispatch(createStudent(this.formPerson));
    }

    this.bunnerService.setBannerStatus(true);
  }

  public setPersons(storagePerson: IPerson): void {
    this.formPerson = cloneDeep(storagePerson);
    this.storedPerson = storagePerson;

    if (this.isEditForm) {
      this.router.navigate(['students', 'student', 'edit', this.formPerson._id]);
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
