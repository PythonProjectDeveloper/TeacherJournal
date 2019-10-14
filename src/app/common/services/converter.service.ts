import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
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
