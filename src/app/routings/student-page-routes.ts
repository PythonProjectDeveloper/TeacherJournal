import { Routes } from '@angular/router';
import { StudentFormComponent } from '../components/students/student-form/student-form.component';
import { StudentsTableComponent } from '../components/students/students-table/students-table.component';
import { ExitAboutGuard } from '../common/guards/exit-about.guard';

export const studentPageRoutes: Routes = [
  { path: '', component: StudentsTableComponent, data: { breadcrumb: null } },
  { path: 'student/add', component: StudentFormComponent, canDeactivate: [ExitAboutGuard], data: { breadcrumb: 'Add student' }  },
  { path: 'student/edit/:id', component: StudentFormComponent, canDeactivate: [ExitAboutGuard], data: { breadcrumb: 'Edit student' }  },
];
