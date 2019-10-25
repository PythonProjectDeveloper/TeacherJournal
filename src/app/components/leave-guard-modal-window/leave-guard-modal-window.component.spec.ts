import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveGuardModalWindowComponent } from './leave-guard-modal-window.component';

describe('LeaveGuardModalWindowComponent', () => {
  let component: LeaveGuardModalWindowComponent;
  let fixture: ComponentFixture<LeaveGuardModalWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveGuardModalWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveGuardModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
