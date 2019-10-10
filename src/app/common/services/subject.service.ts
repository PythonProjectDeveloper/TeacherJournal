import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';
import { assembleUrl } from '../helpers/calculations';
import { SUBJECTS_API_URL } from '../constants/constants-subject';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(
    private httpService: HttpService
  ) { }

  public createSubject(subject: Subject): Observable<Subject> {
    const url: string = SUBJECTS_API_URL;
    return this.httpService.post<Subject>(url, subject, new Subject());
  }

  public updateSubject(subject: Subject): Observable<Subject> {
    const url: string = assembleUrl(SUBJECTS_API_URL, subject.id);
    return this.httpService.put<Subject>(url, subject, new Subject());
  }

  public deleteSubject(subject: Subject): Observable<{}> {
    const url: string = assembleUrl(SUBJECTS_API_URL, subject.id);
    return this.httpService.delete<Subject>(url, {} as Subject);
  }

  public getSubjects(searchText: string = ''): Observable<Subject[]> {
    const url: string = SUBJECTS_API_URL;
    return this.httpService.get<Subject[]>(url, []);
  }

  public getSubject(id: string): Observable<Subject> {
    const url: string = assembleUrl(SUBJECTS_API_URL, id);
    return this.httpService.get<Subject>(url, new Subject());
  }

}
