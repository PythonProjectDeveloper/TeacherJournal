import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent, MatButtonToggleChange } from '@angular/material';
import { students } from 'src/app/common/constants/constants-person';
import { subjects } from 'src/app/common/constants/constants-subject';
import { ISubject } from 'src/app/common/entities/subject';
import { IStudent } from 'src/app/common/entities/person';

enum List {
  Students = 'Students',
  Subjects = 'Subjects'
}

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss']
})
export class StatisticPageComponent implements OnInit {
  currentList = 'Students';
  currentObject: IStudent | ISubject | null = null;
  list = List;
  students = students;
  subjects = subjects;

  constructor() { }

  ngOnInit() {
  }

  setCurrentList(event: MatTabChangeEvent) {
    this.currentList = event.tab.textLabel;
    this.currentObject = null;
  }

  setCurrentObjectId(event: MatButtonToggleChange) {
    this.currentObject = event.value;
  }

}
