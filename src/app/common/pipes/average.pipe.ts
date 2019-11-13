import { Pipe, PipeTransform } from '@angular/core';
import { without, mean, map, filter } from 'lodash';
import { isNumber } from 'util';

@Pipe({
  name: 'average',
  pure: false
})
export class AveragePipe implements PipeTransform {

  public transform(array: number[]): any {
    return mean(filter(array, item => isNumber(item) && !isNaN(item)));
  }

}
