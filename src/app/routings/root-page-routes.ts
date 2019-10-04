import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { StudentPageComponent } from '../components/students/student-page/student-page.component';
import { SubjectPageComponent } from '../components/subjects/subject-page/subject-page.component';
import { StatisticPageComponent } from '../components/statistics/statistic-page/statistic-page.component';
import { ExportComponent } from '../components/export/export.component';
import { studentPageRoutes } from './student-page-routes';
import { subjectPageRoutes } from './subject-page-routes';



export const rootPageRoutes: Routes = [
  { path: '', component: StudentPageComponent, children: studentPageRoutes },
  { path: 'subjects', component: SubjectPageComponent, children: subjectPageRoutes },
  { path: 'statistics', component: StatisticPageComponent },
  { path: 'export', component: ExportComponent },
  { path: '**', component: PageNotFoundComponent },
];