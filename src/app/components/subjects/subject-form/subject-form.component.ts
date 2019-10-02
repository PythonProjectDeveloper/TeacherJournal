import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/common/entities/subject';
import { teachers } from 'src/app/common/constants/constants-person';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent implements Subject, OnInit {
  teachers = teachers;

  id: string;
  name: string;
  teacherId: string;
  cabinet: string;
  description: string;

  constructor() { }

  ngOnInit() {
  }

}
