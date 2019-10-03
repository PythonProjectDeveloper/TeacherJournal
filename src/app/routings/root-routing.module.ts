import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../root/app.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { StudentPageComponent } from '../components/students/student-page/student-page.component';
import { SubjectPageComponent } from '../components/subjects/subject-page/subject-page.component';
import { StatisticPageComponent } from '../components/statistics/statistic-page/statistic-page.component';
import { ExportComponent } from '../components/export/export.component';



const routes: Routes = [
  { path: '', component: StudentPageComponent },
  { path: 'subjects', component: SubjectPageComponent },
  { path: 'statistics', component: StatisticPageComponent },
  { path: 'export', component: ExportComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
