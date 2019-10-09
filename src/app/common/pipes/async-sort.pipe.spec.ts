import { AsyncSortPipe } from './async-sort.pipe';

describe('AsyncSortPipe', () => {
  it('create an instance', () => {
    const pipe: AsyncSortPipe = new AsyncSortPipe();
    expect(pipe).toBeTruthy();
  });
});
