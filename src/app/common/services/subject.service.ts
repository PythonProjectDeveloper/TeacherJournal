import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { assembleUrl } from '../helpers/calculations';
import { SUBJECTS_API_URL } from '../constants/constants-subject';
import { HttpService } from './http.service';
import { HttpParams } from '@angular/common/http';
import { ISubject } from '../entities/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(
    private httpService: HttpService
  ) { }

  public createSubject(subject: ISubject): Observable<ISubject> {
    const url: string = SUBJECTS_API_URL;
    return this.httpService.post<ISubject>(url, subject);
  }

  public updateSubject(subject: ISubject): Observable<ISubject> {
    const url: string = assembleUrl(SUBJECTS_API_URL, subject._id);
    return  this.httpService.put<ISubject>(url, subject);
  }

  public deleteSubject(subject: ISubject): Observable<{}> {
    const url: string = assembleUrl(SUBJECTS_API_URL, subject._id);
    return  this.httpService.delete<ISubject>(url);
  }

  // TODO: change search after adding server side
  public getSubjects(searchText: string = ''): Observable<ISubject[]> {
    const url: string = SUBJECTS_API_URL;
    const params: HttpParams = new HttpParams().set('name_like', searchText);
    return this.httpService.get<ISubject[]>(url, { params });
  }

  public getSubject(id: string): Observable<ISubject> {
    const url: string = assembleUrl(SUBJECTS_API_URL, id);
    return this.httpService.get<ISubject>(url);
  }

}
