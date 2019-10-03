import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule,
  MatRippleModule,
  MatSidenavModule,
  MatTabsModule,
  MatButtonToggleModule
} from '@angular/material';

import { AppComponent } from './root/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExportComponent } from './components/export/export.component';
import { StudentFormComponent } from './components/students/student-form/student-form.component';
import { StudentPageComponent } from './components/students/student-page/student-page.component';
import { StudentsTableComponent } from './components/students/students-table/students-table.component';
import { SubjectFormComponent } from './components/subjects/subject-form/subject-form.component';
import { SubjectPageComponent } from './components/subjects/subject-page/subject-page.component';
import { HeaderComponent } from './components/header/header.component';
import { StatisticPageComponent } from './components/statistics/statistic-page/statistic-page.component';
import { StatisticStudentComponent } from './components/statistics/statistic-student/statistic-student.component';
import { StatisticSubjectComponent } from './components/statistics/statistic-subject/statistic-subject.component';
import { SharedModule } from './shared/shared.module';
import { SubjectListComponent } from './components/subjects/subject-list/subject-list.component';
import { SubjectTableComponent } from './components/subjects/subject-table/subject-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ExportComponent,
    StudentFormComponent,
    StudentPageComponent,
    StudentsTableComponent,
    SubjectFormComponent,
    SubjectPageComponent,
    HeaderComponent,
    StatisticPageComponent,
    StatisticStudentComponent,
    StatisticSubjectComponent,
    SubjectListComponent,
    SubjectTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    SharedModule,
    MatTooltipModule,
    MatRippleModule,
    MatSidenavModule,
    MatTabsModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
