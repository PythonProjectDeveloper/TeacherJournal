export interface IExtendedModel<T> {
  isEqual(other: T): boolean;
  getCopy(): T;
}
