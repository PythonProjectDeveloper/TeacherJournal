import { Routes } from '@angular/router';
import { SubjectListComponent } from '../components/subjects/subject-list/subject-list.component';
import { SubjectFormComponent } from '../components/subjects/subject-form/subject-form.component';
import { SubjectTableComponent } from '../components/subjects/subject-table/subject-table.component';
import { ExitAboutGuard } from '../common/guards/exit-about.guard';



export const subjectPageRoutes: Routes = [
  { path: '', component: SubjectListComponent },
  { path: 'subject/add', component: SubjectFormComponent, canDeactivate: [ExitAboutGuard] },
  { path: 'subject/edit/:id', component: SubjectFormComponent, canDeactivate: [ExitAboutGuard] },
  { path: 'subject/journal/:id', component: SubjectTableComponent, canDeactivate: [ExitAboutGuard] },
];
