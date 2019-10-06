import { Component, OnInit, Input } from '@angular/core';
import { IStudent } from 'src/app/common/entities/person';

@Component({
  selector: 'app-statistic-student',
  templateUrl: './statistic-student.component.html',
  styleUrls: ['./statistic-student.component.scss']
})
export class StatisticStudentComponent implements OnInit {
  @Input() student: IStudent;

  constructor() { }

  ngOnInit() {
  }

}
