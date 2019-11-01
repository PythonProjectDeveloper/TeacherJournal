import { AsyncSortPipe } from './async-sort.pipe';
import { of, Observable } from 'rxjs';

describe('AsyncSortPipe', () => {
  let pipe: AsyncSortPipe = new AsyncSortPipe();

  describe('#transform', () => {
    const stub: any = {
        collection: [
          { 'user': 'fred',   'age': 48 },
          { 'user': 'barney', 'age': 36 },
          { 'user': 'fred',   'age': 40 },
          { 'user': 'barney', 'age': 34 }
        ],
        args: ['user', 'age'],
        result: [
          { 'user': 'barney', 'age': 34 },
          { 'user': 'barney', 'age': 36 },
          { 'user': 'fred',   'age': 40 },
          { 'user': 'fred',   'age': 48 }
        ]
      };

    it('should work with observable<T[]> and return sordted data', () => {
      const collection: Observable<any> = of(stub.collection);

      (<Observable<any>>pipe.transform(collection, ...stub.args)).subscribe(result =>
        expect(result).toEqual(stub.result)
      );
    });

    it('should work with T[] and return sorted data', () => {
      expect(pipe.transform(stub.collection, ...stub.args)).toEqual(stub.result);
    });
  });
});
