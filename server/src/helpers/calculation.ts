import { random } from 'lodash';

export function getRandomMark(min: number, max: number): number | null {
  const num = random(min - 1, max + 1);
  return  num < min || num > max ? null : num;
}
