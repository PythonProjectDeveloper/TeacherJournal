import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student, Person } from '../models/person';
import { HttpParams } from '@angular/common/http';
import { STUDENTS_API_URL } from '../constants/constants-person';
import { assembleUrl } from '../helpers/calculations';
import { HttpService } from './http.service';
import { ConverterService } from './converter.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(
    private httpService: HttpService,
    private converterService: ConverterService
  ) { }

  public createStudent(person: Person): Observable<Person> {
    const url: string = STUDENTS_API_URL;
    const response$: Observable<Person> = this.httpService.post<Person>(url, person, new Person());
    return this.converterService.convertToObject<Person>(response$, Student);
  }

  public updateStudent(person: Person): Observable<Person> {
    const url: string = assembleUrl(STUDENTS_API_URL, person.id);
    const response$: Observable<Person> = this.httpService.put<Person>(url, person, new Person());
    return this.converterService.convertToObject<Person>(response$, Student);
  }

  public deleteStudent(person: Person): Observable<any> {
    const url: string = assembleUrl(STUDENTS_API_URL, person.id);
    const response$: Observable<Person | {}> = this.httpService.delete<Person>(url, {} as Person);
    return this.converterService.convertToObject<Person>(response$, Student);
  }

  // TODO: change search after adding server side
  public getStudents(searchText: string = ''): Observable<Person[]> {
    const url: string = STUDENTS_API_URL;
    const params: HttpParams = new HttpParams().set('firstName_like', searchText);
    const response$: Observable<Person[]> = this.httpService.get<Person[]>(url, [], { params });
    return this.converterService.convertToObjects<Person>(response$, Student);
  }

  public getStudent(id: string): Observable<Person> {
    const url: string = assembleUrl(STUDENTS_API_URL, id);
    const response$: Observable<Person> = this.httpService.get<Person>(url, new Student());
    return this.converterService.convertToObject<Person>(response$, Student);
  }
}
