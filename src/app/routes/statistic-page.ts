import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { StatisticSubjectComponent } from '../components/statistics/statistic-subject/statistic-subject.component';
import { StatisticStudentComponent } from '../components/statistics/statistic-student/statistic-student.component';
import { IMAGE_URL } from '../shared/constants/constants-page-not-found';

export const statisticPageRoutes: Routes = [
  { path: '', component: PageNotFoundComponent, data: { imageUrl: IMAGE_URL, titleText: 'SELECT_ITEM' } },
  { path: 'student/:id', component: StatisticStudentComponent, data: { breadcrumb: 'STUDENT' } },
  { path: 'subject/:id', component: StatisticSubjectComponent, data: { breadcrumb: 'SUBJECT' } },
];
