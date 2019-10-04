import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/common/entities/subject';
import { teachers } from 'src/app/common/constants/constants-person';
import { ComponentCanDeactivate } from 'src/app/common/guards/exit-about.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent implements Subject, ComponentCanDeactivate, OnInit {
  teachers = teachers;

  id: string;
  name: string;
  teacherId: string;
  cabinet: string;
  description: string;

  constructor() { }

  ngOnInit() {
  }

  canDeactivate() : boolean | Observable<boolean>{
    return true;
  }

}
