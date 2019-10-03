import { Component } from '@angular/core';
import { teachers, students } from 'src/app/common/constants/constants-person';
import { subjects } from 'src/app/common/constants/constants-subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TeacherJournal';
}
