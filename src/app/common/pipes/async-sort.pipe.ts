import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { sortBy } from 'lodash';

@Pipe({
  name: 'asyncSort'
})
export class AsyncSortPipe implements PipeTransform {

  public transform(collection: Observable<any[]> | any[], ...args: string[]): Observable<any[]> | any[] {

    if (Array.isArray(collection)) {
      return sortBy(collection, args);
    }

    return collection.pipe(
      map(items => sortBy(items, args))
    );
  }

}
