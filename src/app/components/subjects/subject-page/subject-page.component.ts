import { Component, OnInit } from '@angular/core';
import { subjects } from 'src/app/common/constants/constants-subject';
import { teachers } from 'src/app/common/constants/constants-person';

@Component({
  selector: 'app-subject-page',
  templateUrl: './subject-page.component.html',
  styleUrls: ['./subject-page.component.scss']
})
export class SubjectPageComponent implements OnInit {
  subjects = subjects;
  teachers = teachers;

  constructor() { }

  ngOnInit() {
  }

}
