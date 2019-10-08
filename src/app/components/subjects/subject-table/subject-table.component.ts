import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ComponentCanDeactivate } from 'src/app/common/guards/exit-about.guard';
import { Observable } from "rxjs";
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
  isTableDataChanged = false;
  storedJurnal: Journal;
  formJurnal: Journal;
  subject: Subject;

  constructor(public journalService: JournalService, public subjectService: SubjectService, public route: ActivatedRoute) {
    this.setJournal = this.setJournal.bind(this);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.journalService.getJournal(params.id).subscribe(this.setJournal);

      this.subject = this.subjectService.getSubject(params.id);
    });
  }

  canDeactivate() : boolean | Observable<boolean>{
    return this.formJurnal.isEqual(this.storedJurnal);
  }

  onSave() {
    this.journalService.saveJournal(this.formJurnal).subscribe(this.setJournal);
  }

  setJournal(storedJurnal: Journal) {
    this.formJurnal = storedJurnal.getCopy();
    this.storedJurnal = storedJurnal;
    this.isTableDataChanged = false;
  }

  onAddColumn() {
    this.formJurnal.addColumn();
  }

  onChangeHeaderCell(event, index: number) {
    this.formJurnal.updateDayName(index, event.target.value);
    this.setSaveButtonVision();
  }

  onChangeSimpleCell(event, studentId: string, index: number) {
    this.formJurnal.updateMark(studentId, index, event.target.value);
    this.setSaveButtonVision();
  }

  setSaveButtonVision(){
    const isEqual = this.formJurnal.isEqual(this.storedJurnal);
    this.isTableDataChanged = !isEqual;
  }
}
