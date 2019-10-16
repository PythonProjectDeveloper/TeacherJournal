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
import { AppRoutingModule } from './app-routing.module';
import { ExitAboutGuard } from './common/guards/exit-about.guard';
import { RouterModule } from '@angular/router';
import { AveragePipe } from './common/pipes/average.pipe';
import { AverageMarkHighlightDirective } from './common/directives/average-mark-highlight.directive';
import { NumberCheckDirective } from './common/directives/number-check.directive';
import { FocusHighlightDirective } from './common/directives/focus-highlight.directive';
import { AsyncSortPipe } from './common/pipes/async-sort.pipe';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderInterceptor } from './common/interceptors/header.interceptor';
import { UrlInterceptor } from './common/interceptors/url.interceptor';
import { LeaveGuardModalWindowComponent } from './components/leave-guard-modal-window/leave-guard-modal-window.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { StudentEffects } from './redux/effects/students';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './redux/reducers';

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
    SubjectTableComponent,
    AveragePipe,
    AverageMarkHighlightDirective,
    NumberCheckDirective,
    FocusHighlightDirective,
    AsyncSortPipe,
    LeaveGuardModalWindowComponent
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
    MatButtonToggleModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ StudentEffects ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    ExitAboutGuard,
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
