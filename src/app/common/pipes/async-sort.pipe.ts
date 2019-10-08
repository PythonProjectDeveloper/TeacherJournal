import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'asyncSort'
})
export class AsyncSortPipe implements PipeTransform {

  transform(items: any, ...args: string[]): any {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const sortedArray = _.sortBy(items, args);
        resolve(sortedArray);
      }, 0);
    })
  }

}
