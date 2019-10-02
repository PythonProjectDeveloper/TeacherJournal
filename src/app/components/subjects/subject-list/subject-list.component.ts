import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'src/app/common/entities/subject';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {
  @Input() subjects: Subject[];

  constructor() { }

  ngOnInit() {
  }

}
