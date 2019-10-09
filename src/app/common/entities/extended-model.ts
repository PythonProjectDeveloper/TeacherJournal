export interface ExtendedModel<T> {
  isEqual(other: T): boolean;
  getCopy(): T;
}
