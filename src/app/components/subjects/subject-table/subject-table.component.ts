import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ComponentCanDeactivate } from 'src/app/common/guards/exit-about.guard';
import { Observable } from 'rxjs';
import { JournalService } from 'src/app/common/services/journal.service';
import { Journal } from 'src/app/common/models/journal';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from 'src/app/common/services/subject.service';
import { Subject } from 'src/app/common/models/subject';
import { IAverageMarkColor } from 'src/app/common/directives/average-mark-highlight.directive';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.scss']
})
export class SubjectTableComponent implements ComponentCanDeactivate, OnInit {
  public isTableDataChanged = false;
  public storedJurnal: Journal;
  public formJurnal: Journal;
  public subject: Subject;
  public averageMarkColors: IAverageMarkColor[] = [
    { maxAverageMark: 5, class: 'table-wrapper__row__average-mark-lt-5' },
    { maxAverageMark: 11, class: 'table-wrapper__row__average-mark-lt-11' }
  ];

  constructor(public journalService: JournalService, public subjectService: SubjectService, public route: ActivatedRoute) {
    this.setJournal = this.setJournal.bind(this);
    this.setSubject = this.setSubject.bind(this);
  }

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.journalService.getJournal(params.id).subscribe(this.setJournal);
      this.subjectService.getSubject(params.id).subscribe(this.setSubject);
    });
  }

  public canDeactivate(): boolean | Observable<boolean> {
    return this.formJurnal.isEqual(this.storedJurnal);
  }

  public onSave(): void {
    this.journalService.saveJournal(this.formJurnal).subscribe(this.setJournal);
  }

  public setJournal(storedJurnal: Journal): void {
    this.formJurnal = storedJurnal.getCopy();
    this.storedJurnal = storedJurnal;
    this.isTableDataChanged = false;
  }

  public setSubject(subject: Subject): void {
    this.subject = subject;
  }

  public onAddColumn(): void {
    this.formJurnal.addColumn();
  }

  public onChangeHeaderCell(event: FocusEvent, index: number): void {
    this.formJurnal.updateDayName(index, (event.target as HTMLInputElement).value);
    this.setSaveButtonVision();
  }

  public onChangeSimpleCell(event: FocusEvent, studentId: string, index: number): void {
    this.formJurnal.updateMark(studentId, index, (event.target as HTMLInputElement).value);
    this.setSaveButtonVision();
  }

  public setSaveButtonVision(): void {
    const isEqual: boolean = this.formJurnal.isEqual(this.storedJurnal);
    this.isTableDataChanged = !isEqual;
  }
}
