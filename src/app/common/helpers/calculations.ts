import * as _ from 'lodash';
import { ICollapseState } from '../entities/dropdown';

export function dropLastEmptyItems(array: any): any[] {
  return _.dropRightWhile(array, (item: any) => !item);
}

export function assembleUrl(...args: string[]): string {
  return _.join(args, '/');
}

export function getCollapseState(dates: ICollapseState[]): boolean | null {
  const quantity: number = dates.reduce((acc, date) => date.state ? acc + 1 : acc, 0);

  if (quantity === 0) { return false; }
  if (quantity === dates.length) { return true; }

  return null;
}
