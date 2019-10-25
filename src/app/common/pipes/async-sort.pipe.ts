import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'asyncSort'
})
export class AsyncSortPipe implements PipeTransform {

  public transform(collection: Observable<any[]> | any[], ...args: string[]): Observable<any[]> | any[] {

    if (Array.isArray(collection)) {
      return _.sortBy(collection, args);
    }

    return collection.pipe(
      map(items => _.sortBy(items, args))
    );
  }

}
