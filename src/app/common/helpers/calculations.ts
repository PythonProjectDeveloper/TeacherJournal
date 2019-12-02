import { ICollapseState } from '../entities/dropdown';
import { each, isNull, join } from 'lodash';
import { IDayState, IMarkState, IAverageMarkState } from '../entities/journal';
import { isUndefined } from 'util';

export function assembleUrl(...args: string[]): string {
  return join(args, '/');
}

export function getCollapseState(dates: ICollapseState[]): boolean | null {
  const quantity: number = dates.reduce((acc, date) => date.state ? acc + 1 : acc, 0);

  if (quantity === 0) { return false; }
  if (quantity === dates.length) { return true; }

  return null;
}

export function getAverageMarks(days: IDayState[]): IAverageMarkState[] {
  const averageMarks: IAverageMarkState[] = [];
  each(days, day => {
    each(day.marks, (mark, idx) => {
      if (isUndefined(averageMarks[idx])) {
        averageMarks[idx] = {
          ...mark,
          value: 0,
          markQuantity: 0,
        };
      }

      if (isNull(mark.value)) { return; }

      averageMarks[idx].value += mark.value;
      averageMarks[idx].markQuantity += 1;
    });
  });

  each(averageMarks, mark => mark.value = mark.value / mark.markQuantity);

  return averageMarks;
}
