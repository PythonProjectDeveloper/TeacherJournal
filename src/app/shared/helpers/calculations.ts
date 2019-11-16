import { ICollapseState } from '../common/entities/dropdown';

export function getCollapseState(dates: ICollapseState[]): boolean | null {
  const quantity: number = dates.reduce((acc, date) => date.state ? acc + 1 : acc, 0);

  if (quantity === 0) { return false; }
  if (quantity === dates.length) { return true; }

  return null;
}
