import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { getJournalTableForm, getWorkDays } from 'src/app/common/helpers/calculations';
import { journals } from 'src/app/common/constants/constants-journal';
import { students } from 'src/app/common/constants/constants-person';
import * as _ from 'lodash';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.scss']
})
export class SubjectTableComponent implements OnInit {
  displayedColumns: string[];
  dataSource = new MatTableDataSource([]);
  baseColumns = ['firstName', 'lastName', 'averageMark'];
  workDaysColumns: string[];
  isTableChanged = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit() {
    const journal = journals[0];
    this.workDaysColumns = getWorkDays(journal);
    this.dataSource.data = getJournalTableForm(students, journal);
    this.displayedColumns = _.concat(this.baseColumns, this.workDaysColumns);
    this.dataSource.sort = this.sort;
  }

}
