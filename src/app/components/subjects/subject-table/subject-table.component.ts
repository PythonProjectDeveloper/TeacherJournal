import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { getJournalTableForm, getWorkDays } from 'src/app/common/helpers/calculations';
import { journals } from 'src/app/common/constants/constants-journal';
import { students } from 'src/app/common/constants/constants-person';
import * as _ from 'lodash';
import { ComponentCanDeactivate } from 'src/app/common/guards/exit-about.guard';
import { Observable } from "rxjs";

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.scss']
})
export class SubjectTableComponent implements ComponentCanDeactivate, OnInit {
  dataSource = new MatTableDataSource([]);
  baseColumns = ['firstName', 'lastName', 'averageMark'];
  workDaysColumns: string[];
  displayedColumns: string[];
  isTableDataChanged = false;
  journal = journals[0];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.workDaysColumns = getWorkDays(this.journal);
    this.dataSource.data = getJournalTableForm(students, this.journal);
    this.displayedColumns = _.concat(this.baseColumns, this.workDaysColumns);
    this.dataSource.sort = this.sort;
  }

  onAddColumn() {

  }

  canDeactivate() : boolean | Observable<boolean>{
    return true;
  }

}
