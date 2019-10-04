import { Routes } from '@angular/router';
import { StudentFormComponent } from '../components/students/student-form/student-form.component';
import { StudentsTableComponent } from '../components/students/students-table/students-table.component';



export const studentPageRoutes: Routes = [
  { path: '', component: StudentsTableComponent },
  { path: 'student/add', component: StudentFormComponent },
  { path: 'student/edit/:id', component: StudentFormComponent },
];
