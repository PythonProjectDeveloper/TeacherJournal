import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpService } from './http.service';
import { IPersonState } from '../entities/person';
import { TEACHERS_API_URL } from '../constants/constants-urls';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(
    private httpService: HttpService
  ) { }

  public getTeachers(): Observable<IPersonState[]> {
    const url: string = TEACHERS_API_URL;
    return this.httpService.get<IPersonState[]>(url, []);
  }
}
