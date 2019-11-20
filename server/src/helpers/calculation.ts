import { random, isArray, isObject, each, isUndefined, isNull } from 'lodash';
import { IDay, IAverageMark } from '../entities/journals';

export function getRandomMark(min: number, max: number): number | null {
  const num = random(min - 1, max + 1);
  return  num < min || num > max ? null : num;
}

export function removeEmptyId(obj: any): any {
  if (!obj._id) { delete obj._id; }

  for (const val of Object.values(obj)) {
    if (isArray(val) || isObject(val)) {
      removeEmptyId(val);
    }
  }

  return obj;
}

export function getAverageMarks(days: IDay[]): IAverageMark[] {
  const averageMarks: IAverageMark[] = [];
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
