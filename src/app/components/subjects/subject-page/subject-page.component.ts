import { Component, OnInit, Input } from '@angular/core';
import { Teacher } from 'src/app/common/entities/person';
import { Subject } from 'src/app/common/entities/subject';

@Component({
  selector: 'app-subject-page',
  templateUrl: './subject-page.component.html',
  styleUrls: ['./subject-page.component.scss']
})
export class SubjectPageComponent implements OnInit {
  @Input() subjects: Subject[];
  @Input() teachers: Teacher[];

  constructor() { }

  ngOnInit() {
  }

}
