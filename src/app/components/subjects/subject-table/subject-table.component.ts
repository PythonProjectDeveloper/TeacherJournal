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
  public storedJournal: Journal;
  public formJournal: Journal;
  public subject: Subject;
  public averageMarkColors: IAverageMarkColor[] = [
    { maxAverageMark: 5, class: 'table-wrapper__row__average-mark-lt-5' },
    { maxAverageMark: 11, class: 'table-wrapper__row__average-mark-lt-11' }
  ];

  constructor(
    private journalService: JournalService,
    private subjectService: SubjectService,
    private route: ActivatedRoute
  ) {
    this.setJournal = this.setJournal.bind(this);
    this.setSubject = this.setSubject.bind(this);
  }

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.subjectService.getSubject(params.id).subscribe(this.setSubject);
    });
  }

  public canDeactivate(): boolean | Observable<boolean> {
    return this.isJournalChanged();
  }

  public onSave(): void {
    this.journalService.updateJournal(this.formJournal).subscribe(this.setJournal);
  }

  public setJournal(storedJournal: Journal): void {
    this.formJournal = storedJournal.getCopy();
    this.storedJournal = storedJournal;
    this.isTableDataChanged = false;
  }

  public setSubject(subject: Subject): void {
    this.subject = subject;

    this.journalService.getJournal(subject.journalId).subscribe(this.setJournal);
  }

  public onAddColumn(): void {
    this.formJournal.addColumn();
  }

  public onRemoveColumn(index: number): void {
    this.formJournal.removeColumn(index);
    this.setSaveButtonVision();
  }

  // FIXME: remove cell copying
  public onChangeHeaderCell(event: FocusEvent, index: number): void {
    this.formJournal.updateDayName(index, (event.target as HTMLInputElement).value);
    this.setSaveButtonVision();
  }

  // FIXME: remove cell copying
  public onChangeSimpleCell(event: FocusEvent, studentId: string, index: number): void {
    this.formJournal.updateMark(studentId, index, (event.target as HTMLInputElement).value);
    this.setSaveButtonVision();
  }

  public setSaveButtonVision(): void {
    this.isTableDataChanged = !this.isJournalChanged();
  }

  public isJournalChanged(): boolean {
    return this.formJournal.isEqual(this.storedJournal);
  }
}
