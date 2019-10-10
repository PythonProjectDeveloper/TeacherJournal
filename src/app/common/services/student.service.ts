import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student, Person } from '../models/person';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { STUDENTS_API_URL } from '../constants/constants-person';
import { assembleUrl } from '../helpers/calculations';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(
    private http: HttpClient,
    private logSirvice: LogService
  ) { }

  public createStudent(person: Person): Observable<Person> {
    const url: string = STUDENTS_API_URL;
    return this.http.post<Person>(url, person)
      .pipe(
        catchError((error) => this.logSirvice.handleHttpError<Person>(error, new Student()))
      );
  }

  public updateStudent(person: Person): Observable<Person> {
    const url: string = assembleUrl(STUDENTS_API_URL, person.id);
    return this.http.put<Person>(url, person)
      .pipe(
        catchError((error) => this.logSirvice.handleHttpError<Person>(error, new Student()))
      );
  }

  public deleteStudent(person: Person): Observable<{}> {
    const url: string = assembleUrl(STUDENTS_API_URL, person.id);
    return this.http.delete(url)
      .pipe(
        catchError((error) => this.logSirvice.handleHttpError<Person>(error, {}))
      );
  }

  public getStudents(searchText: string = ''): Observable<Person[]> {
    const url: string = STUDENTS_API_URL;
    return this.http.get<Person[]>(url)
      .pipe(
        catchError((error) => this.logSirvice.handleHttpError<Person[]>(error, []))
      );
  }

  public getStudent(id: string): Observable<Person> {
    const url: string = assembleUrl(STUDENTS_API_URL, id);
    return this.http.get<Person>(url)
      .pipe(
        catchError((error) => this.logSirvice.handleHttpError<Person>(error, new Student()))
      );
  }
}
