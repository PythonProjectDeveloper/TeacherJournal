import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { StudentPageComponent } from '../components/students/student-page/student-page.component';
import { SubjectPageComponent } from '../components/subjects/subject-page/subject-page.component';
import { StatisticPageComponent } from '../components/statistics/statistic-page/statistic-page.component';
import { ExportComponent } from '../components/export/export.component';
import { studentPageRoutes } from './student-page-routes';
import { subjectPageRoutes } from './subject-page-routes';



export const rootPageRoutes: Routes = [
  { path: '', component: StudentPageComponent, children: studentPageRoutes, data: { breadcrumb: "Students" } },
  { path: 'subjects', component: SubjectPageComponent, children: subjectPageRoutes, data: { breadcrumb: "Subjects" }  },
  { path: 'statistics', component: StatisticPageComponent, data: { breadcrumb: "Statistics" }  },
  { path: 'export', component: ExportComponent, data: { breadcrumb: "Export" }  },
  { path: '**', component: PageNotFoundComponent },
];
