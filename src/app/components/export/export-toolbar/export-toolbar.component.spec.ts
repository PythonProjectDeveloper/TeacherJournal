import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportToolbarComponent } from './export-toolbar.component';

describe('ExportToolbarComponent', () => {
  let component: ExportToolbarComponent;
  let fixture: ComponentFixture<ExportToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
