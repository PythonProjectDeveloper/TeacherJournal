import { Injectable } from '@angular/core';
import { ExportType, TableType } from '../constants/constants-export';
import { IDownloader } from '../entities/downloaders';
import { DOWNLOADERS } from '../models/downloaders';
import { Person } from '../models/person';
import { Observable } from 'rxjs';
import { Journal } from '../models/journal';
import { Subject } from '../models/subject';
import { map } from 'rxjs/operators';
import { parseStudents, parseJournals, parseSubjects } from '../helpers/export-parser';
import { StudentService } from './student.service';
import { SubjectService } from './subject.service';
import { JournalService } from './journal.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private downloader: IDownloader;

  constructor(
    private studentService: StudentService,
    private subjectService: SubjectService,
    private journalService: JournalService,
  ) {}

  public setDownloader(type: ExportType): void {
    this.downloader = DOWNLOADERS[type];
  }

  public export(tableType: TableType): void {
    this.getData(tableType).subscribe(data => {
      this.downloader.export(tableType, data);
    });
  }

  public getData(tableType: TableType): Observable<any> {
    switch (tableType) {
      case TableType.STUDENTS: return this.studentService.getStudents().pipe(map(parseStudents));
      case TableType.SUBJECTS: return this.subjectService.getSubjects().pipe(map(parseSubjects));
      case TableType.JOURNALS: return this.journalService.getJournals().pipe(map(parseJournals));
      default: throw Error(`There is not data loader for ${tableType}`);
    }
  }
}
