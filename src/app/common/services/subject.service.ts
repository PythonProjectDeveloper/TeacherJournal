import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';
import { assembleUrl } from '../helpers/calculations';
import { SUBJECTS_API_URL } from '../constants/constants-subject';
import { HttpService } from './http.service';
import { HttpParams } from '@angular/common/http';
import { ConverterService } from './converter.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(
    private httpService: HttpService,
    private converterService: ConverterService
  ) { }

  public createSubject(subject: Subject): Observable<Subject> {
    const url: string = SUBJECTS_API_URL;
    const response$: Observable<Subject> = this.httpService.post<Subject>(url, subject, new Subject());
    return this.converterService.convertToObject<Subject>(response$, Subject);
  }

  public updateSubject(subject: Subject): Observable<Subject> {
    const url: string = assembleUrl(SUBJECTS_API_URL, subject._id);
    const response$: Observable<Subject> = this.httpService.put<Subject>(url, subject, new Subject());
    return this.converterService.convertToObject<Subject>(response$, Subject);
  }

  public deleteSubject(subject: Subject): Observable<{}> {
    const url: string = assembleUrl(SUBJECTS_API_URL, subject._id);
    const response$: Observable<Subject | {}> = this.httpService.delete<Subject>(url, {} as Subject);
    return this.converterService.convertToObject<Subject>(response$, Subject);
  }

  // TODO: change search after adding server side
  public getSubjects(searchText: string = ''): Observable<Subject[]> {
    const url: string = SUBJECTS_API_URL;
    const params: HttpParams = new HttpParams().set('name_like', searchText);
    const response$: Observable<Subject[]> = this.httpService.get<Subject[]>(url, [], { params });
    return this.converterService.convertToObjects<Subject>(response$, Subject);
  }

  public getSubject(id: string): Observable<Subject> {
    const url: string = assembleUrl(SUBJECTS_API_URL, id);
    const response$: Observable<Subject> = this.httpService.get<Subject>(url, new Subject());
    return this.converterService.convertToObject<Subject>(response$, Subject);
  }

}
