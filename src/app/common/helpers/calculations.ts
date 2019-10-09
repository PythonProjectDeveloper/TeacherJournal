import * as _ from 'lodash';

export function dropLastEmptyItems(array: any): any[] {
  return _.dropRightWhile(array, (item: any) => !item);
}
