import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFormComponent } from './student-form.component';
import { initialState } from 'src/app/redux/reducers/students';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { Student } from 'src/app/common/models/person';
import { Router, ActivatedRoute } from '@angular/router';
import { BannerService } from 'src/app/common/services/banner.service';
import { createStudent, updateStudent, loadStudent } from 'src/app/redux/actions/students';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';

let component: StudentFormComponent;
let fixture: ComponentFixture<StudentFormComponent>;
let store: any;
const student: Student = new Student({ _id: 'x', firstName: 'x', lastName: 'x', address: 'x', description: 'x' });
const id: string = '3';

class MockRoute {
  public params = new BehaviorSubject({ id });

  public resetPersonID(): void {
    this.params.next({ } as any);
  }
}

class MockRouter {
  public navigate(): void { }
}

function configureTestingModule(): void {
  TestBed.configureTestingModule({
    declarations: [ StudentFormComponent ],
    imports: [
      NoopAnimationsModule,
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatCardModule,
      TranslateModule.forRoot()
    ],
    providers: [
      provideMockStore({ initialState: { students: initialState } }),
      { provide: ActivatedRoute, useClass: MockRoute },
      { provide: Router, useClass: MockRouter }
    ]
  })
  .compileComponents();
}

function setComponent(): void {
  fixture = TestBed.createComponent(StudentFormComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();

  store = TestBed.get(Store);
}

describe('StudentListComponent', () => {
  describe('#ngOnInit', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should select student from store', () => {
      spyOn(component, 'setPersons');

      component.ngOnInit();

      expect(component.setPersons).toHaveBeenCalledWith(initialState.student);
    });

    it('should load user by id from url', () => {

      spyOn(store, 'dispatch');

      component.ngOnInit();

      expect(store.dispatch).toHaveBeenCalledWith(loadStudent({ id }));
      expect(component.isEditForm).toEqual(true);
    });

    it('should set editable form as true if url has id otherwise false', () => {
      component.ngOnInit();

      expect(component.isEditForm).toEqual(true);

      const router: any = TestBed.get(ActivatedRoute);
      router.resetPersonID();

      component.ngOnInit();

      expect(component.isEditForm).toEqual(false);
    });
  });

  describe('#canDeactivate', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should return true if all field is equal otherwise false', () => {
      component.formPerson = student;
      component.storedPerson = Object.assign(Object.create(Object.getPrototypeOf(student)), student);

      expect(component.canDeactivate()).toEqual(true);

      component.formPerson._id = '100';

      expect(component.canDeactivate()).toEqual(false);
    });
  });

  describe('#onSave', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should do nothing if form is not valid', () => {
      const bannerService: BannerService = TestBed.get(BannerService);
      component.formPerson = new Student();

      spyOn(bannerService, 'setBannerStatus');

      component.onSave();

      expect(bannerService.setBannerStatus).not.toHaveBeenCalled();

    });

    it('should update student if student is not new', () => {
      component.formPerson = student;
      component.isEditForm = true;

      spyOn(store, 'dispatch');

      component.onSave();

      expect(store.dispatch).toHaveBeenCalledWith(updateStudent(student));
    });

    it('should create student if student is new', () => {
      component.formPerson = student;
      component.isEditForm = false;

      spyOn(store, 'dispatch');

      component.onSave();

      expect(store.dispatch).toHaveBeenCalledWith(createStudent(student));
      expect(component.isEditForm).toEqual(true);
    });

    it('should show ad banner', () => {
      const bannerService: BannerService = TestBed.get(BannerService);
      component.formPerson = student;

      spyOn(bannerService, 'setBannerStatus');

      component.onSave();

      expect(bannerService.setBannerStatus).toHaveBeenCalledWith(true);
    });
  });

  describe('#setPersons', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should redirect to edit form if person is created', () => {
      const router: any = TestBed.get(Router);
      component.isEditForm = true;

      spyOn(router, 'navigate');

      component.setPersons(student);

      expect(router.navigate).toHaveBeenCalledWith(['students', 'student', 'edit', student._id]);
    });

    it('should copy student in local from', () => {
      component.setPersons(student);

      expect(component.formPerson).not.toBe(component.storedPerson);
    });
  });

  describe('#ngOnDestroy', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should unsubscribe from all subscriptions', () => {
      component.destroy$.subscribe(
        flag => expect(flag).toEqual(true)
      );

      component.ngOnDestroy();

      expect(store.destroy$).toEqual(undefined);

    });
  });

  describe('#markup', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should call method by submit from', () => {
      const from: any = fixture.nativeElement.querySelector('.form');

      spyOn(component, 'onSave');

      from.dispatchEvent(new Event('submit'));

      fixture.detectChanges();

      expect(component.onSave).toHaveBeenCalled();
    });
  });
});
