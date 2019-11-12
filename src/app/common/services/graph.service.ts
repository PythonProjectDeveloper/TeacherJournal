import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { STUDENT_GRAPH_API_URL, SUBJECT_GRAPH_API_URL } from '../constants/constants-statistic';
import { HttpService } from './http.service';
import { assembleUrl } from '../helpers/calculations';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  constructor(
    private httpService: HttpService,
  ) {}

  public getStudentGraphData(id: string): Observable<any> {
    const url: string = assembleUrl(STUDENT_GRAPH_API_URL, id);
    return this.httpService.get(url, []);
  }

  public getSubjectGraphData(id: string): Observable<any> {
    const url: string = assembleUrl(SUBJECT_GRAPH_API_URL, id);
    return this.httpService.get(url, {});
  }
}
