import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Person } from '../models/person';
import { HttpClient } from '@angular/common/http';
import { TEACHERS_API_URL } from '../constants/constants-person';
import { TypeHttpQuery } from '../entities/log';
import { handleError } from '../helpers/calculations';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(private http: HttpClient) { }

  public getTeachers(): Observable<Person[]> {
    return this.http.get<Person[]>(TEACHERS_API_URL)
      .pipe(
        catchError((error) => handleError<Person[]>(this.http, TypeHttpQuery.GET, TEACHERS_API_URL, error, []))
      );
  }
}
