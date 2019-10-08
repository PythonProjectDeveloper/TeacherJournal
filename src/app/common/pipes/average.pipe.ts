import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'average',
  pure: false
})
export class AveragePipe implements PipeTransform {

  transform(array: number[]): any {
    return _.mean(array.filter(Boolean));
  }

}
