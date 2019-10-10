import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Person } from '../models/person';
import { HttpClient } from '@angular/common/http';
import { TEACHERS_API_URL } from '../constants/constants-person';
import { catchError } from 'rxjs/operators';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(
    private http: HttpClient,
    private logSirvice: LogService
  ) { }

  public getTeachers(): Observable<Person[]> {
    const url: string = TEACHERS_API_URL;
    return this.http.get<Person[]>(url)
      .pipe(
        catchError((error) => this.logSirvice.handleHttpError<Person[]>(error, []))
      );
  }
}
