import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http/http';
import { Observable } from 'rxjs';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const API_DOMAIN: string = 'http://localhost:5000';

    const updatedRequest: HttpRequest<any> = request.clone({
      url: `${API_DOMAIN}/${request.url}`
    });

    return next.handle(updatedRequest);
  }
}
