import { Injectable } from '@angular/core';
import { IDownloader } from '../entities/downloaders';
import { DOWNLOADERS } from '../helpers/downloaders';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import {
  ExportType,
  TableType,
} from '../constants/constants-export';
import {
  STUDENTS_EXPORT_API_URL,
  SUBJECTS_EXPORT_API_URL,
  JOURNALS_EXPORT_API_URL,
} from '../constants/constants-urls';

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

  public getStudents(): Observable<any[]> {
    const url: string = STUDENTS_EXPORT_API_URL;
    return this.httpService.get(url);
  }

  public getSubjects(): Observable<any[]> {
    const url: string = SUBJECTS_EXPORT_API_URL;
    return this.httpService.get(url);
  }

  public getJournals(): Observable<any[]> {
    const url: string = JOURNALS_EXPORT_API_URL;
    return this.httpService.get(url);
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
