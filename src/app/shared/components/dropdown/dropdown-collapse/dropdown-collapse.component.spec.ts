import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownCollapseComponent } from './dropdown-collapse.component';

describe('DropdownCollapseComponent', () => {
  let component: DropdownCollapseComponent;
  let fixture: ComponentFixture<DropdownCollapseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownCollapseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
