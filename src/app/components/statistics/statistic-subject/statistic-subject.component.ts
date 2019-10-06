import { Component, OnInit, Input } from '@angular/core';
import { ISubject } from 'src/app/common/entities/subject';

@Component({
  selector: 'app-statistic-subject',
  templateUrl: './statistic-subject.component.html',
  styleUrls: ['./statistic-subject.component.scss']
})
export class StatisticSubjectComponent implements OnInit {
  @Input() subject: ISubject;

  constructor() { }

  ngOnInit() {
  }

}
