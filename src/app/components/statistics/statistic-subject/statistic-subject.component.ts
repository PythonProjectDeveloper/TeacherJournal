import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'src/app/common/models/subject';
import { SubjectService } from 'src/app/common/services/subject.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-statistic-subject',
  templateUrl: './statistic-subject.component.html',
  styleUrls: ['./statistic-subject.component.scss']
})
export class StatisticSubjectComponent implements OnInit {
  subject: Subject;

  constructor(public subjectService: SubjectService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.subject = this.subjectService.getSubject(params.id);
    });
  }

}
