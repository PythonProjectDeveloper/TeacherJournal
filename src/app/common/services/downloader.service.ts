import { Injectable } from '@angular/core';
import { ExportType, TableType } from '../constants/constants-export';
import { IDownloader } from '../entities/downloaders';
import { DOWNLOADERS } from '../models/downloaders';
import { STUDENTS_API_URL } from '../constants/constants-person';
import { Person, Student } from '../models/person';
import { Observable } from 'rxjs';
import { Journal } from '../models/journal';
import { JOURNALS_API_URL } from '../constants/constants-journal';
import { HttpService } from './http.service';
import { Subject } from '../models/subject';
import { SUBJECTS_API_URL } from '../constants/constants-subject';
import { map } from 'rxjs/operators';
import { parseStudents, parseJournals, parseSubjects } from '../helpers/exportParser';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private downloader: IDownloader;

  constructor(
    private httpService: HttpService,
  ) {}

  public setDownloader(type: ExportType): void {
    this.downloader = DOWNLOADERS[type];
  }

  public export(tableType: TableType): void {
    this.getData(tableType).subscribe(data => {
      this.downloader.export(tableType, data);
    });
  }

  public getStudents(): Observable<Person[]> {
    return this.httpService.get<Person[]>(STUDENTS_API_URL, []).pipe(map(parseStudents));
  }

  public getSubjects(): Observable<Subject[]> {
    return this.httpService.get<Subject[]>(SUBJECTS_API_URL, []).pipe(map(parseSubjects));
  }

  public getJournals(): Observable<Journal[]> {
    return this.httpService.get<Journal[]>(JOURNALS_API_URL, []).pipe(map(parseJournals));
  }

  public getData(tableType: TableType): Observable<any> {
    switch (tableType) {
      case TableType.STUDENTS: return this.getStudents();
      case TableType.SUBJECTS: return this.getSubjects();
      case TableType.JOURNALS: return this.getJournals();
      default: throw Error(`There is not data loader for ${tableType}`);
    }
  }
}
