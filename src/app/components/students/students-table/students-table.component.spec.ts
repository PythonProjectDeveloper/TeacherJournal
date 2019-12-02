import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsTableComponent } from './students-table.component';
import { TranslateModule } from '@ngx-translate/core';
import {
  MatIconModule,
  MatCardModule,
  MatTooltipModule,
  MatRippleModule,
  MatTableModule
} from '@angular/material';
import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from 'src/app/redux/reducers/students';
import { updateFilterData, deleteStudent } from 'src/app/redux/actions/students';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { Student } from 'src/app/common/models/person';

let component: StudentsTableComponent;
let fixture: ComponentFixture<StudentsTableComponent>;
let store: any;
const filterData: string = 'filter Text';

@Component({
  selector: 'app-button',
  template: `
    <button></button>`
})
class TestButtonComponent {
}

@Component({
  selector: 'app-toolbar',
  template: `
    <button class="app-toolbar" (click)="onClick()"></button>`
})
class TestToolbarComponent {
  @Output() public valueChanged = new EventEmitter();

  public onClick(): void {
    this.valueChanged.emit(filterData);
  }
}

function configureTestingModule(): void {
  TestBed.configureTestingModule({
    declarations: [ StudentsTableComponent, TestToolbarComponent, TestButtonComponent ],
    imports: [
      MatIconModule,
      MatTableModule,
      MatTooltipModule,
      MatRippleModule,
      RouterTestingModule,
      TranslateModule.forRoot()
    ],
    providers: [
      provideMockStore({ initialState: { students: initialState } }),
      { provide: HAMMER_LOADER, useValue: () => new Promise(() => {}) }
    ]
  })
  .compileComponents();
}

function setComponent(): void {
  fixture = TestBed.createComponent(StudentsTableComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();

  store = TestBed.get(Store);
}

describe('StudentListComponent', () => {
  describe('#ngOnInit', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should select students from store', () => {
      component.ngOnInit();

      expect(component.dataSource.data).toEqual(initialState.students);

      spyOn(store, 'subscribe');

      component.ngOnInit();

      expect(store.subscribe).toHaveBeenCalled();
    });

    it('should set default filter text in store', () => {
      spyOn(store, 'dispatch');

      component.ngOnInit();

      expect(store.dispatch).toHaveBeenCalledWith(updateFilterData({ filterData: '' }));
    });
  });

  describe('#onDelete', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should remove student from store', () => {
      const student: any = {};

      spyOn(store, 'dispatch');

      component.onDelete(student);

      expect(store.dispatch).toHaveBeenCalledWith(deleteStudent(student));
    });
  });

  describe('#onToolbarValueChanged', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should update filter text in store', () => {
      spyOn(store, 'dispatch');

      component.onToolbarValueChanged(filterData);

      expect(store.dispatch).toHaveBeenCalledWith(updateFilterData({ filterData }));
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

    it('should create table row for each student', () => {
      const students: Student[] = [new Student(), new Student(), new Student()];
      component.dataSource.data = students;

      fixture.detectChanges();

      const cards: any[] = fixture.nativeElement.querySelectorAll('.table-wrapper__row');
      expect(cards.length).toEqual(students.length);
    });

    it('should call method by click', () => {
      const students: Student[] = [new Student(), new Student(), new Student()];
      component.dataSource.data = students;

      fixture.detectChanges();

      const appToolbar: any = fixture.nativeElement.querySelector('.app-toolbar');
      const deleteButton: any = fixture.nativeElement.querySelector('.table-wrapper__control-delete-button');

      spyOn(component, 'onDelete');
      spyOn(component, 'onToolbarValueChanged');

      appToolbar.dispatchEvent(new Event('click'));
      deleteButton.dispatchEvent(new Event('click'));

      fixture.detectChanges();

      expect(component.onDelete).toHaveBeenCalled();
      expect(component.onToolbarValueChanged).toHaveBeenCalled();
    });
  });
});
