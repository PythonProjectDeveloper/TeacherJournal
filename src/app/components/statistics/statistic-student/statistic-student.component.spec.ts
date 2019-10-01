import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticStudentComponent } from './statistic-student.component';

describe('StatisticStudentComponent', () => {
  let component: StatisticStudentComponent;
  let fixture: ComponentFixture<StatisticStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
