import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'src/app/common/entities/person';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.scss']
})
export class StudentPageComponent implements OnInit {
  @Input() students: Student[];


  constructor() { }

  ngOnInit() {
  }

}
