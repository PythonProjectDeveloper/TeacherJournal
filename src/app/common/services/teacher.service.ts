import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TEACHERS_API_URL } from '../constants/constants-person';
import { HttpService } from './http.service';
import { IPerson } from '../entities/person';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(
    private httpService: HttpService
  ) { }

  public getTeachers(): Observable<IPerson[]> {
    const url: string = TEACHERS_API_URL;
    return this.httpService.get<IPerson[]>(url, []);
  }
}
