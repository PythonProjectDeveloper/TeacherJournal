import { Injectable } from '@angular/core';
import { Journal } from '../models/journal';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { assembleUrl, handleError } from '../helpers/calculations';
import { catchError } from 'rxjs/operators';
import { JOURNALS_API_URL } from '../constants/constants-journal';
import { TypeHttpQuery } from '../entities/log';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(private http: HttpClient) { }

  public saveJournal(journal: Journal): Observable<Journal> {
    return this.http.put<Journal>(assembleUrl(JOURNALS_API_URL, journal.subjectId), journal)
      .pipe(
        catchError((error) => handleError<Journal>(this.http, TypeHttpQuery.GET, JOURNALS_API_URL, error, new Journal()))
      );
  }

  public getJournal(subjectId: string): Observable<Journal> {
    return this.http.get<Journal>(assembleUrl(JOURNALS_API_URL, subjectId))
      .pipe(
        catchError((error) => handleError<Journal>(this.http, TypeHttpQuery.GET, JOURNALS_API_URL, error, new Journal()))
      );
  }
}
