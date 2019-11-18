import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { STUDENTS_API_URL } from '../constants/constants-person';
import { assembleUrl } from '../helpers/calculations';
import { HttpService } from './http.service';
import { IPerson, PERSON } from '../entities/person';
import { IRequestDates } from 'src/app/common/entities/dropdown';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(
    private httpService: HttpService
  ) { }

  public createStudent(person: IPerson): Observable<IPerson> {
    const url: string = STUDENTS_API_URL;
    return this.httpService.post<IPerson>(url, person);
  }

  public updateStudent(person: IPerson): Observable<IPerson> {
    const url: string = assembleUrl(STUDENTS_API_URL, person._id);
    return this.httpService.put<IPerson>(url, person);
  }

  public deleteStudent(person: IPerson): Observable<any> {
    const url: string = assembleUrl(STUDENTS_API_URL, person._id);
    return this.httpService.delete<IPerson>(url);
  }

  public getStudents(filter: string | IRequestDates = ''): Observable<IPerson[]> {
    const url: string = STUDENTS_API_URL;
    const params: HttpParams = new HttpParams().set('filter', JSON.stringify(filter));
    return this.httpService.get<IPerson[]>(url, { params });
  }

  public getStudent(id: string): Observable<IPerson> {
    const url: string = assembleUrl(STUDENTS_API_URL, id);
    return id ? this.httpService.get<IPerson>(url) : of(PERSON);
  }
}
