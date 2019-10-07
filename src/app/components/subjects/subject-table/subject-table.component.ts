import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import * as _ from 'lodash';
import { ComponentCanDeactivate } from 'src/app/common/guards/exit-about.guard';
import { Observable } from "rxjs";
import { baseJournalColumn } from 'src/app/shared/constants/constants-table';
import { JournalService } from 'src/app/common/services/journal.service';
import { Journal } from 'src/app/common/models/journal';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from 'src/app/common/services/subject.service';
import { Subject } from 'src/app/common/models/subject';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.scss']
})
export class SubjectTableComponent implements ComponentCanDeactivate, OnInit {
  dataSource = new MatTableDataSource([]);
  baseColumns = baseJournalColumn;
  dayNamesColumns: string[];
  displayedColumns: string[];
  isTableDataChanged = false;
  storedJurnal: Journal;
  formJurnal: Journal;
  subject: Subject;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public journalService: JournalService, public subjectService: SubjectService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this.route.params.subscribe((params) => {
      const journal = this.journalService.getJournal(params.id);

      this.subject = this.subjectService.getSubject(params.id);

      this.setTableData(journal)
      this.setJournal(journal);
    });
  }

  onAddColumn() {
    this.formJurnal.addColumn();
    this.setTableData(this.formJurnal)
  }

  canDeactivate() : boolean | Observable<boolean>{
    return this.formJurnal.isEqual(this.storedJurnal);
  }

  onSave() {
    this.journalService.saveJournal(this.formJurnal);
    this.setJournal(this.formJurnal);
  }

  setJournal(storedJurnal: Journal) {
    this.formJurnal = storedJurnal.getCopy();
    this.storedJurnal = storedJurnal;
  }

  setTableData(journal: Journal) {
    this.dayNamesColumns = journal.getDayNames();
    this.dataSource.data = journal.getJournalTableForm();
    this.displayedColumns = _.concat(this.baseColumns, this.dayNamesColumns);
  }
}
