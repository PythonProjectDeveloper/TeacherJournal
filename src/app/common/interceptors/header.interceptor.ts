import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const updatedRequest: HttpRequest<any> = request.clone({
      headers: request.headers.set('Content-Type', 'application/json')
    });

    return next.handle(updatedRequest);
  }
}
