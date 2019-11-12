import { random } from 'lodash';

export function getRandomMark(min: number, max: number): number | null {
  const num = random(min, max + 1);
  return num === max ? null : num;
}
