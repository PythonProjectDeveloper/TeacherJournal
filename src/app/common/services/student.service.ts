import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { assembleUrl } from '../helpers/calculations';
import { HttpService } from './http.service';
import { IPersonState, PERSON_STATE } from '../entities/person';
import { IRequestDatesState } from 'src/app/common/entities/dropdown';
import { STUDENTS_API_URL } from '../constants/constants-urls';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(
    private httpService: HttpService
  ) { }

  public createStudent(person: IPersonState): Observable<IPersonState> {
    const url: string = STUDENTS_API_URL;
    return this.httpService.post<IPersonState>(url, person);
  }

  public updateStudent(person: IPersonState): Observable<IPersonState> {
    const url: string = assembleUrl(STUDENTS_API_URL, person._id);
    return this.httpService.put<IPersonState>(url, person);
  }

  public deleteStudent(person: IPersonState): Observable<any> {
    const url: string = assembleUrl(STUDENTS_API_URL, person._id);
    return this.httpService.delete<IPersonState>(url);
  }

  public getStudents(filter: string | IRequestDatesState = ''): Observable<IPersonState[]> {
    const url: string = STUDENTS_API_URL;
    const params: HttpParams = new HttpParams().set('filter', JSON.stringify(filter));
    return this.httpService.get<IPersonState[]>(url, { params });
  }

  public getStudent(id: string): Observable<IPersonState> {
    const url: string = assembleUrl(STUDENTS_API_URL, id);
    return id ? this.httpService.get<IPersonState>(url) : of(PERSON_STATE);
  }
}
