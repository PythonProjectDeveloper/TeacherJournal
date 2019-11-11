import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { assembleUrl } from '../helpers/calculations';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const updatedRequest: HttpRequest<any> = request.clone({
      url: assembleUrl(environment.apiDomainUrl, 'api', request.url)
    });

    return next.handle(updatedRequest);
  }
}
