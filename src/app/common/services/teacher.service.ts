import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Person } from '../models/person';
import { TEACHERS_API_URL } from '../constants/constants-person';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(
    private httpService: HttpService
  ) { }

  public getTeachers(): Observable<Person[]> {
    const url: string = TEACHERS_API_URL;
    return this.httpService.get<Person[]>(url, []);
  }
}
