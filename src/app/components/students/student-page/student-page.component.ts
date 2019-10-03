import { Component, OnInit } from '@angular/core';
import { students } from 'src/app/common/constants/constants-person';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.scss']
})
export class StudentPageComponent implements OnInit {
  students = students;


  constructor() { }

  ngOnInit() {
  }

}
