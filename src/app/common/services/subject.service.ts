import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { assembleUrl } from '../helpers/calculations';
import { HttpService } from './http.service';
import { HttpParams } from '@angular/common/http';
import { ISubjectState, SUBJECT_STATE } from '../entities/subject';
import { SUBJECTS_API_URL } from '../constants/constants-urls';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(
    private httpService: HttpService
  ) { }

  public createSubject(subject: ISubjectState): Observable<ISubjectState> {
    const url: string = SUBJECTS_API_URL;
    return this.httpService.post<ISubjectState>(url, subject);
  }

  public updateSubject(subject: ISubjectState): Observable<ISubjectState> {
    const url: string = assembleUrl(SUBJECTS_API_URL, subject._id);
    return  this.httpService.put<ISubjectState>(url, subject);
  }

  public deleteSubject(subject: ISubjectState): Observable<{}> {
    const url: string = assembleUrl(SUBJECTS_API_URL, subject._id);
    return  this.httpService.delete<ISubjectState>(url);
  }

  public getSubjects(filter: string = ''): Observable<ISubjectState[]> {
    const url: string = SUBJECTS_API_URL;
    const params: HttpParams = new HttpParams().set('filter', filter);
    return this.httpService.get<ISubjectState[]>(url, { params });
  }

  public getSubject(id: string): Observable<ISubjectState> {
    const url: string = assembleUrl(SUBJECTS_API_URL, id);
    return id ? this.httpService.get<ISubjectState>(url) : of(SUBJECT_STATE);
  }

}
