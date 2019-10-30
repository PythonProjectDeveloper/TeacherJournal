import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectPageComponent } from './subject-page.component';
import { RouterModule } from '@angular/router';

describe('SubjectPageComponent', () => {
  let component: SubjectPageComponent;
  let fixture: ComponentFixture<SubjectPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectPageComponent ],
      imports: [
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
