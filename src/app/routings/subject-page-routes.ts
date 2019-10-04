import { Routes } from '@angular/router';
import { SubjectListComponent } from '../components/subjects/subject-list/subject-list.component';
import { SubjectFormComponent } from '../components/subjects/subject-form/subject-form.component';
import { SubjectTableComponent } from '../components/subjects/subject-table/subject-table.component';



export const subjectPageRoutes: Routes = [
  { path: '', component: SubjectListComponent },
  { path: 'subject/add', component: SubjectFormComponent },
  { path: 'subject/edit/:id', component: SubjectFormComponent },
  { path: 'subject/journal/:id', component: SubjectTableComponent },
];
