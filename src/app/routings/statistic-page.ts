import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { StatisticSubjectComponent } from '../components/statistics/statistic-subject/statistic-subject.component';
import { StatisticStudentComponent } from '../components/statistics/statistic-student/statistic-student.component';
import { imageUrl } from '../shared/constants/constants-page-not-found';



export const statisticPageRoutes: Routes = [
  { path: '', component: PageNotFoundComponent, data: { imageUrl: imageUrl, titleText: "Select a item." } },
  { path: 'student/:id', component: StatisticStudentComponent, data: { breadcrumb: "student" } },
  { path: 'subject/:id', component: StatisticSubjectComponent, data: { breadcrumb: "subject" } },
];
