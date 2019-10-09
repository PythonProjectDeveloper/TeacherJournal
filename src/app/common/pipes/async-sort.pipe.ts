import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'asyncSort'
})
export class AsyncSortPipe implements PipeTransform {

  public transform(collection: any, ...args: string[]): Promise<any> {

    // if the collection is an observable object then convert to the promise
    if (collection.subscribe && typeof collection.subscribe === 'function') {
      collection = collection.toPromise();

    // if the collection is an array then wrap in the promise
    } else if (Array.isArray(collection)) {
      collection = Promise.resolve(collection);
    }

    // sort received data and return them
    return collection.then((items: any) => _.sortBy(items, args));
  }

}
