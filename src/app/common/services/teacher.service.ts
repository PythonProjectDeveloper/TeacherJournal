import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Person } from '../models/person';
import { TEACHERS_API_URL } from '../constants/constants-person';
import { HttpService } from './http.service';
import { ConverterService } from './converter.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(
    private httpService: HttpService,
    private converterService: ConverterService
  ) { }

  public getTeachers(): Observable<Person[]> {
    const url: string = TEACHERS_API_URL;
    const response$: Observable<Person[]> = this.httpService.get<Person[]>(url, []);
    return this.converterService.convertToObjects<Person>(response$, Person);
  }
}
