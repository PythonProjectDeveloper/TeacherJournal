import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { LogService } from './log.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
}
