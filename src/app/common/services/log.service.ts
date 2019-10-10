import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Log } from '../models/log';
import { LOGS_API_URL } from '../constants/constants-log';

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
    const log: Log = new Log(error);

    // send log to log server
    this.http.post<Log>(LOGS_API_URL, log);

    // show error to user
    log.printError();

    return of(defaultValue as T);
  }
}
