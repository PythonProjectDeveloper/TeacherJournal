import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  private handleResult<T>(httpResponse: Observable<T>, defaultValue: any): Observable<T> {
    return httpResponse.pipe(
      catchError((error) => this.logSirvice.handleHttpError<T>(error, defaultValue))
    );
  }

  public post<T>(url: string, body: T, httpOptions?: object, defaultValue: any = {}): Observable<T> {
    const httpResponse: Observable<T> = this.http.post<T>(url, body, httpOptions);
    return this.handleResult(httpResponse, defaultValue);
  }

  public put<T>(url: string, body: T, httpOptions?: object, defaultValue: any = {}): Observable<T> {
    const httpResponse: Observable<T> = this.http.put<T>(url, body, httpOptions);
    return this.handleResult(httpResponse, defaultValue);
  }

  public delete<T>(url: string, httpOptions?: object, defaultValue: any = {}): Observable<{}> {
    const httpResponse: Observable<T | {}> = this.http.delete(url, httpOptions);
    return this.handleResult(httpResponse, defaultValue);
  }

  public get<T>(url: string, httpOptions?: object, defaultValue: any = {}): Observable<T> {
    const httpResponse: Observable<T> = this.http.get<T>(url, httpOptions);
    return this.handleResult(httpResponse, defaultValue);
  }
}
