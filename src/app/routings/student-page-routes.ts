import { Routes } from '@angular/router';
import { StudentFormComponent } from '../components/students/student-form/student-form.component';
import { StudentsTableComponent } from '../components/students/students-table/students-table.component';
import { ExitAboutGuard } from '../common/guards/exit-about.guard';



export const studentPageRoutes: Routes = [
  { path: '', component: StudentsTableComponent },
  { path: 'student/add', component: StudentFormComponent, canDeactivate: [ExitAboutGuard] },
  { path: 'student/edit/:id', component: StudentFormComponent, canDeactivate: [ExitAboutGuard] },
];
