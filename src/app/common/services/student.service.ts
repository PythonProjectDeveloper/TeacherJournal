import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student, Person } from '../models/person';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { STUDENTS_API_URL } from '../constants/constants-person';
import { assembleUrl } from '../helpers/calculations';
import { LogService } from './log.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(
    private httpService: HttpService
  ) { }

  public createStudent(person: Person): Observable<Person> {
    const url: string = STUDENTS_API_URL;
    return this.httpService.post<Person>(url, person, new Person());
  }

  public updateStudent(person: Person): Observable<Person> {
    const url: string = assembleUrl(STUDENTS_API_URL, person.id);
    return this.httpService.put<Person>(url, person, new Person());
  }

  public deleteStudent(person: Person): Observable<{}> {
    const url: string = assembleUrl(STUDENTS_API_URL, person.id);
    return this.httpService.delete<Person>(url, {} as Person);
  }

  public getStudents(searchText: string = ''): Observable<Person[]> {
    const url: string = STUDENTS_API_URL;
    return this.httpService.get<Person[]>(url, []);
  }

  public getStudent(id: string): Observable<Person> {
    const url: string = assembleUrl(STUDENTS_API_URL, id);
    return this.httpService.get<Person>(url, new Student());
  }
}
