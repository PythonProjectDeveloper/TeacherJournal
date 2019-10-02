import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/common/entities/person';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements Student, OnInit {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;

  constructor() { }

  ngOnInit() {
  }

}
