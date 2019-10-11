import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student, Person } from '../models/person';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { STUDENTS_API_URL } from '../constants/constants-person';
import { assembleUrl } from '../helpers/calculations';
import { LogService } from './log.service';
import { HttpService } from './http.service';
import { IPerson } from '../entities/person';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(
    private httpService: HttpService
  ) { }

  public createStudent(person: Person): Observable<Person> {
    const url: string = STUDENTS_API_URL;
    const response$: Observable<Person> = this.httpService.post<Person>(url, person, new Person());
    return this.httpService.convertToObject<Person>(response$, Student);
  }

  public updateStudent(person: Person): Observable<Person> {
    const url: string = assembleUrl(STUDENTS_API_URL, person.id);
    const response$: Observable<Person> = this.httpService.put<Person>(url, person, new Person());
    return this.httpService.convertToObject<Person>(response$, Student);
  }

  public deleteStudent(person: Person): Observable<{}> {
    const url: string = assembleUrl(STUDENTS_API_URL, person.id);
    const response$: Observable<Person | {}> = this.httpService.delete<Person>(url, {} as Person);
    return this.httpService.convertToObject<Person>(response$, Student);
  }

  // TODO: change search after adding server side
  public getStudents(searchText: string = ''): Observable<Person[]> {
    const url: string = STUDENTS_API_URL;
    const params: HttpParams = new HttpParams().set('firstName_like', searchText);
    const response$: Observable<Person[]> = this.httpService.get<Person[]>(url, [], { params });
    return this.httpService.convertToObjects<Person>(response$, Student);
  }

  public getStudent(id: string): Observable<Person> {
    const url: string = assembleUrl(STUDENTS_API_URL, id);
    const response$: Observable<Person> = this.httpService.get<Person>(url, new Student());
    return this.httpService.convertToObject<Person>(response$, Student);
  }
}
