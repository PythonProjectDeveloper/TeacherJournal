import { Component, OnInit, Input } from '@angular/core';
import { Teacher } from 'src/app/common/entities/person';
import { Subject } from 'src/app/common/entities/subject';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent implements Subject, OnInit {
  @Input() teachers: Teacher[];

  id: string;
  name: string;
  teacherId: string;
  cabinet: string;
  description: string;

  constructor() { }

  ngOnInit() {
  }

}
