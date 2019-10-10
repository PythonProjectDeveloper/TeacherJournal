import * as _ from 'lodash';
import { TypeHttpQuery } from '../entities/log';
import { Log } from '../models/log';
import { of, Observable } from 'rxjs';
import { LOGS_API_URL } from '../constants/constants-log';
import { HttpClient } from '@angular/common/http';

export function dropLastEmptyItems(array: any): any[] {
  return _.dropRightWhile(array, (item: any) => !item);
}

export function assembleUrl(...args: string[]): string {
  return _.join(args, '/');
}

export function handleError<T> (
  http: HttpClient,
  typeHttpQuery: TypeHttpQuery,
  url: string,
  errorDescription: any,
  defaultValue: any
): Observable<T> {
  const log: Log = new Log(typeHttpQuery, url, errorDescription);

  // send log to log server
  http.post<Log>(LOGS_API_URL, log);

  // show error to user
  log.printError();

  return of(defaultValue as T);
}
