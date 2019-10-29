import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import {
  MatInputModule,
  MatIconModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent
      ],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        MatInputModule,
        MatIconModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onClick', () => {
    it('should emit event with entered text', () => {
      spyOn(component.valueChanged, 'emit');

      const testText: string = 'test';
      component.searchText = testText;
      const form: any = fixture.nativeElement.querySelector('.toolbar__form');
      form.dispatchEvent(new Event('submit'));

      fixture.detectChanges();

      expect(component.valueChanged.emit).toHaveBeenCalledWith(testText);
    });
  });

  describe('#template', () => {
    it('should set text depens on current locale', () => {
      const input: any = fixture.nativeElement.querySelector('.toolbar__input-name');
      const button: any = fixture.nativeElement.querySelector('.toolbar__button');

      expect(input.placeholder).toEqual('fields.query');
      expect(button.innerText).toEqual('actions.search');
    });
  });
});
