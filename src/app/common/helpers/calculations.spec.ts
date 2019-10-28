import { assembleUrl, dropLastEmptyItems } from './calculations';

describe('calculations', () => {
  describe('#dropLastEmptyItems', () => {
    it('must delete the last empty items', () => {
      const data: any[] = [1, 2, 3, null, undefined, 0];
      const result: any[] = [1, 2, 3];

      expect(dropLastEmptyItems(data)).toEqual(result);
    });
  });

  describe('#assembleUrl', () => {
    it('should join all array with /', () => {
      const data: string[] = ['1', '2', '3'];
      const result: string = '1/2/3';

      expect(assembleUrl(...data)).toEqual(result);
    });
  });
});
