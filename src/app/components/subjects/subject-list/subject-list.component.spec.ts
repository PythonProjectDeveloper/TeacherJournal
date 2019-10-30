import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectListComponent } from './subject-list.component';
import { TranslateModule } from '@ngx-translate/core';
import {
  MatIconModule,
  MatCardModule,
  MatTooltipModule,
  MatRippleModule
} from '@angular/material';
import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from 'src/app/redux/reducers/subjects';
import { updateFilterText, deleteSubject } from 'src/app/redux/actions/subjects';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { Subject } from 'src/app/common/models/subject';

let component: SubjectListComponent;
let fixture: ComponentFixture<SubjectListComponent>;
let store: any;
const filterText: string = 'filter Text';

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
    this.valueChanged.emit(filterText);
  }
}

function configureTestingModule(): void {
  TestBed.configureTestingModule({
    declarations: [ SubjectListComponent, TestToolbarComponent, TestButtonComponent ],
    imports: [
      MatIconModule,
      MatCardModule,
      MatTooltipModule,
      MatRippleModule,
      RouterTestingModule,
      TranslateModule.forRoot()
    ],
    providers: [
      provideMockStore({ initialState: { subjects: initialState } }),
      { provide: HAMMER_LOADER, useValue: () => new Promise(() => {}) }
    ]
  })
  .compileComponents();
}

function setComponent(): void {
  fixture = TestBed.createComponent(SubjectListComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();

  store = TestBed.get(Store);
}

describe('SubjectListComponent', () => {
  describe('#ngOnInit', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should select students from store', () => {
      component.ngOnInit();

      expect(component.subjects).toEqual(initialState.subjects);

      spyOn(store, 'subscribe');

      component.ngOnInit();

      expect(store.subscribe).toHaveBeenCalled();
    });

    it('should set default filter text in store', () => {
      spyOn(store, 'dispatch');

      component.ngOnInit();

      expect(store.dispatch).toHaveBeenCalledWith(updateFilterText(''));
    });
  });

  describe('#onDelete', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should remove subject from store', () => {
      const subject: any = {};

      spyOn(store, 'dispatch');

      component.onDelete(subject);

      expect(store.dispatch).toHaveBeenCalledWith(deleteSubject(subject));
    });
  });

  describe('#onToolbarValueChanged', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should update filter text in store', () => {
      spyOn(store, 'dispatch');

      component.onToolbarValueChanged(filterText);

      expect(store.dispatch).toHaveBeenCalledWith(updateFilterText({ filterText }));
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

    it('should create card for each subject', () => {
      const subjects: Subject[] = [new Subject(), new Subject(), new Subject()];
      component.subjects = subjects;

      fixture.detectChanges();

      const cards: any[] = fixture.nativeElement.querySelectorAll('.subject-container__card-wrapper');
      expect(cards.length).toEqual(subjects.length);
    });

    it('should call method by click', () => {
      const subjects: Subject[] = [new Subject(), new Subject(), new Subject()];
      component.subjects = subjects;

      fixture.detectChanges();

      const appToolbar: any = fixture.nativeElement.querySelector('.app-toolbar');
      const deleteButton: any = fixture.nativeElement.querySelector('.subject-container__control-delete-button');

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
