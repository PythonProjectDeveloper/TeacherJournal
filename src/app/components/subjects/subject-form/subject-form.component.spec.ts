import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectFormComponent } from './subject-form.component';
import { initialState as subjectInitialState } from 'src/app/redux/reducers/subjects';
import { initialState as teacherInitialState } from 'src/app/redux/reducers/teachers';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { Subject } from 'src/app/common/models/subject';
import { Router, ActivatedRoute } from '@angular/router';
import { BannerService } from 'src/app/common/services/banner.service';
import { createSubject, updateSubject, loadSubject } from 'src/app/redux/actions/subjects';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { Teacher } from 'src/app/common/models/person';

let component: SubjectFormComponent;
let fixture: ComponentFixture<SubjectFormComponent>;
let store: any;
const subject: Subject = new Subject({ id: 'x', name: 'x', teacherId: 'x', journalId: 'x', cabinet: 'x', description: 'x' });
const id: string = '3';

class MockRoute {
  public params = new BehaviorSubject({ id });

  public resetSubjectID(): void {
    this.params.next({ } as any);
  }
}

class MockRouter {
  public navigate(): void { }
}

function configureTestingModule(): void {
  TestBed.configureTestingModule({
    declarations: [ SubjectFormComponent ],
    imports: [
      NoopAnimationsModule,
      FormsModule,
      MatSelectModule,
      MatFormFieldModule,
      MatInputModule,
      MatCardModule,
      TranslateModule.forRoot()
    ],
    providers: [
      provideMockStore({ initialState: { subjects: subjectInitialState, teachers: teacherInitialState } }),
      { provide: ActivatedRoute, useClass: MockRoute },
      { provide: Router, useClass: MockRouter }
    ]
  })
  .compileComponents();
}

function setComponent(): void {
  fixture = TestBed.createComponent(SubjectFormComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();

  store = TestBed.get(Store);
}

describe('SubjectListComponent', () => {
  describe('#ngOnInit', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should select teachers from store', () => {
      spyOn(component, 'setTeachers');

      component.ngOnInit();

      expect(component.setTeachers).toHaveBeenCalledWith(teacherInitialState.teachers);
    });

    it('should select subject from store', () => {
      spyOn(component, 'setSubjects');

      component.ngOnInit();

      expect(component.setSubjects).toHaveBeenCalledWith(subjectInitialState.subject);
    });

    it('should load user by id from url', () => {

      spyOn(store, 'dispatch');

      component.ngOnInit();

      expect(store.dispatch).toHaveBeenCalledWith(loadSubject({ id }));
      expect(component.isEditForm).toEqual(true);
    });

    it('should set editable form as true if url has id otherwise false', () => {
      component.ngOnInit();

      expect(component.isEditForm).toEqual(true);

      const router: any = TestBed.get(ActivatedRoute);
      router.resetSubjectID();

      component.ngOnInit();

      expect(component.isEditForm).toEqual(false);
    });
  });

  describe('#canDeactivate', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should return true if all field is equal otherwise false', () => {
      component.formSubject = subject;
      component.storedSubject = Object.assign(Object.create(Object.getPrototypeOf(subject)), subject);

      expect(component.canDeactivate()).toEqual(true);

      component.formSubject.id = '100';

      expect(component.canDeactivate()).toEqual(false);
    });
  });

  describe('#setTeachers', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should save teachers', () => {
      const teachers: Teacher[] = [ new Teacher(), new Teacher(), new Teacher()];
      component.setTeachers(teachers);

      expect(component.teachers).toEqual(teachers);
    });
  });

  describe('#onSave', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should do nothing if form is not valid', () => {
      const bannerService: BannerService = TestBed.get(BannerService);
      component.formSubject = new Subject();

      spyOn(bannerService, 'setBannerStatus');

      component.onSave();

      expect(bannerService.setBannerStatus).not.toHaveBeenCalled();

    });

    it('should update subject if subject is not new', () => {
      component.formSubject = subject;
      component.isEditForm = true;

      spyOn(store, 'dispatch');

      component.onSave();

      expect(store.dispatch).toHaveBeenCalledWith(updateSubject(subject));
    });

    it('should create subject if subject is new', () => {
      component.formSubject = subject;
      component.isEditForm = false;

      spyOn(store, 'dispatch');

      component.onSave();

      expect(store.dispatch).toHaveBeenCalledWith(createSubject(subject));
      expect(component.isEditForm).toEqual(true);
    });

    it('should show ad banner', () => {
      const bannerService: BannerService = TestBed.get(BannerService);
      component.formSubject = subject;

      spyOn(bannerService, 'setBannerStatus');

      component.onSave();

      expect(bannerService.setBannerStatus).toHaveBeenCalledWith(true);
    });
  });

  describe('#setSubjects', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should redirect to edit form if subject is created', () => {
      const router: any = TestBed.get(Router);
      component.isEditForm = true;

      spyOn(router, 'navigate');

      component.setSubjects(subject);

      expect(router.navigate).toHaveBeenCalledWith(['subjects', 'subject', 'edit', subject.id]);
    });

    it('should copy subject in local from', () => {
      component.setSubjects(subject);

      expect(component.formSubject).not.toBe(component.storedSubject);
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
