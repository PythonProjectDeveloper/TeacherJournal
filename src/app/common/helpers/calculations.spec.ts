import { assembleUrl } from './calculations';

describe('calculations', () => {

  describe('#assembleUrl', () => {
    it('should join all array with /', () => {
      const data: string[] = ['1', '2', '3'];
      const result: string = '1/2/3';

      expect(assembleUrl(...data)).toEqual(result);
    });
  });
});
