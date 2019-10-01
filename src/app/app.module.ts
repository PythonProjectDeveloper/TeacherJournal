import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatCardModule, MatButtonModule, MatIconModule} from '@angular/material';

import { AppComponent } from './root/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExportComponent } from './components/export/export.component';
import { StudentFormComponent } from './components/students/student-form/student-form.component';
import { StudentPageComponent } from './components/students/student-page/student-page.component';
import { StudentsTableComponent } from './components/students/students-table/students-table.component';
import { SubjectFormComponent } from './components/subjects/subject-form/subject-form.component';
import { SubjectPageComponent } from './components/subjects/subject-page/subject-page.component';
import { SubjectsTableComponent } from './components/subjects/subjects-table/subjects-table.component';
import { PanelComponent } from './components/panel/panel.component';
import { HeaderComponent } from './components/header/header.component';
import { StatisticPageComponent } from './components/statistics/statistic-page/statistic-page.component';
import { StatisticStudentComponent } from './components/statistics/statistic-student/statistic-student.component';
import { StatisticSubjectComponent } from './components/statistics/statistic-subject/statistic-subject.component';

@NgModule({
  declarations: [
    AppComponent,
    ExportComponent,
    StudentFormComponent,
    StudentPageComponent,
    StudentsTableComponent,
    SubjectFormComponent,
    SubjectPageComponent,
    SubjectsTableComponent,
    PanelComponent,
    HeaderComponent,
    StatisticPageComponent,
    StatisticStudentComponent,
    StatisticSubjectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
