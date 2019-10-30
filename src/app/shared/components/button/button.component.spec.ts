import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import {
  MatIconModule
} from '@angular/material';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonComponent ],
      imports: [
        MatIconModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onClick', () => {
    it('should emit event when button click', () => {
      spyOn(component.clickEvent, 'emit');

      const button: any = fixture.nativeElement.querySelector('.add-button');
      button.dispatchEvent(new Event('click'));

      fixture.detectChanges();

      expect(component.clickEvent.emit).toHaveBeenCalled();
    });
  });
});
