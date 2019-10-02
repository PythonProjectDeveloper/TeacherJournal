import { Component, OnInit } from '@angular/core';
import { subjects } from 'src/app/common/constants/constants-subject';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {
  subjects = subjects;

  constructor() { }

  ngOnInit() {
  }

}
