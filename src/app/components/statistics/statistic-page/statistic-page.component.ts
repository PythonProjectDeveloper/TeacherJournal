import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';

enum Page {
  Students = 'Students',
  Subjects = 'Subjects'
}

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss']
})
export class StatisticPageComponent implements OnInit {
  currentPage = 'Students';
  page = Page;

  constructor() { }

  ngOnInit() {
  }

  setCurrentPage(event: MatTabChangeEvent) {
    this.currentPage = event.tab.textLabel;
  }

}
