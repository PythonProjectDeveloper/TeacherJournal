import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ILog } from '../entities/log';
import { LOGS_API_URL } from '../constants/constants-urls';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(
    private http: HttpClient
  ) { }

  public handleHttpError<T> (
    error: any,
    defaultValue: any
  ): Observable<T> {

    // send log to log server
    this.http.post<ILog>(LOGS_API_URL, error);

    // show error to user
    console.log(error.message);

    return of(defaultValue as T);
  }
}
