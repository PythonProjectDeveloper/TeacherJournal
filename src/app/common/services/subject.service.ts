import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';
import { HttpClient } from '@angular/common/http';
import { assembleUrl } from '../helpers/calculations';
import { catchError } from 'rxjs/operators';
import { SUBJECTS_API_URL } from '../constants/constants-subject';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(
    private http: HttpClient,
    private logSirvice: LogService
  ) { }

  public createSubject(person: Subject): Observable<Subject> {
    const url: string = SUBJECTS_API_URL;
    return this.http.post<Subject>(url, person)
      .pipe(
        catchError((error) => this.logSirvice.handleHttpError<Subject>(error, new Subject()))
      );
  }

  public updateSubject(person: Subject): Observable<Subject> {
    const url: string = assembleUrl(SUBJECTS_API_URL, person.id);
    return this.http.put<Subject>(url, person)
      .pipe(
        catchError((error) => this.logSirvice.handleHttpError<Subject>(error, new Subject()))
      );
  }

  public deleteSubject(person: Subject): Observable<{}> {
    const url: string = assembleUrl(SUBJECTS_API_URL, person.id);
    return this.http.delete(url)
      .pipe(
        catchError((error) => this.logSirvice.handleHttpError<Subject>(error, {}))
      );
  }

  public getSubjects(searchText: string = ''): Observable<Subject[]> {
    const url: string = SUBJECTS_API_URL;
    return this.http.get<Subject[]>(url)
      .pipe(
        catchError((error) => this.logSirvice.handleHttpError<Subject[]>(error, []))
      );
  }

  public getSubject(id: string): Observable<Subject> {
    const url: string = assembleUrl(SUBJECTS_API_URL, id);
    return this.http.get<Subject>(url)
      .pipe(
        catchError((error) => this.logSirvice.handleHttpError<Subject>(error, new Subject()))
      );
  }

}
