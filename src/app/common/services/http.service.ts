import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogService } from './log.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private logSirvice: LogService
  ) { }

  private handleResult<T>(httpResponse: Observable<T>, defaultValue: T): Observable<T> {
    return httpResponse.pipe(
      catchError((error) => this.logSirvice.handleHttpError<T>(error, defaultValue))
    );
  }

  public post<T>(url: string, body: T, defaultValue: T, httpOptions?: object): Observable<T> {
    const httpResponse: Observable<T> = this.http.post<T>(url, body, httpOptions);
    return this.handleResult(httpResponse, defaultValue);
  }

  public put<T>(url: string, body: T, defaultValue: T, httpOptions?: object): Observable<T> {
    const httpResponse: Observable<T> = this.http.put<T>(url, body, httpOptions);
    return this.handleResult(httpResponse, defaultValue);
  }

  public delete<T>(url: string, defaultValue: T, httpOptions?: object): Observable<{}> {
    const httpResponse: Observable<T | {}> = this.http.delete(url, httpOptions);
    return this.handleResult(httpResponse, defaultValue);
  }

  public get<T>(url: string, defaultValue: T, httpOptions?: object): Observable<T> {
    const httpResponse: Observable<T> = this.http.get<T>(url, httpOptions);
    return this.handleResult(httpResponse, defaultValue);
  }

  public convertToObject<T>(object$: Observable<any>, inst: any): Observable<T> {
    return object$.pipe(
      map((item) => new inst(item))
    );
  }

  public convertToObjects<T>(objects$: Observable<any[]>, inst: any): Observable<T[]> {
    return objects$.pipe(
      map((items) => items.map(item => new inst(item)))
    );
  }
}
