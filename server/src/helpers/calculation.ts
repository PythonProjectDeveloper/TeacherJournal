import { random, isArray, isObject } from 'lodash';

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
