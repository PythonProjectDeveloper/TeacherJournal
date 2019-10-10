import * as _ from 'lodash';

export function dropLastEmptyItems(array: any): any[] {
  return _.dropRightWhile(array, (item: any) => !item);
}

export function assembleUrl(...args: string[]): string {
  return _.join(args, '/');
}
