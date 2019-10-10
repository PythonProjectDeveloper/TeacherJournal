import { Injectable } from '@angular/core';
import { Journal } from '../models/journal';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { assembleUrl } from '../helpers/calculations';
import { catchError } from 'rxjs/operators';
import { JOURNALS_API_URL } from '../constants/constants-journal';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  constructor(
    private http: HttpClient,
    private logSirvice: LogService
  ) { }

  public saveJournal(journal: Journal): Observable<Journal> {
    const url: string = assembleUrl(JOURNALS_API_URL, journal.subjectId);
    return this.http.put<Journal>(url, journal)
      .pipe(
        catchError((error) => this.logSirvice.handleHttpError<Journal>(error, new Journal()))
      );
  }

  public getJournal(subjectId: string): Observable<Journal> {
    const url: string = assembleUrl(JOURNALS_API_URL, subjectId);
    return this.http.get<Journal>(url)
      .pipe(
        catchError((error) => this.logSirvice.handleHttpError<Journal>(error, new Journal()))
      );
  }
}
