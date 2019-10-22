import { Component, OnInit } from '@angular/core';

const SUBJECTS: any = [
  {
    subjectName: 'Biology',
    dates: {
      ''
    }
  }
]

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
