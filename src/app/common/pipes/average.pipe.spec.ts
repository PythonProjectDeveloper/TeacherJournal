import { AveragePipe } from './average.pipe';

describe('AveragePipe', () => {
  let pipe: AveragePipe = new AveragePipe();

  describe('#transform', () => {
    it('should work with number[] and return average value', () => {
      expect(pipe.transform([4, 2, 8, 6])).toEqual(20);
    });

    it('should ignore no number value', () => {
      expect(pipe.transform([1, 0, null, undefined])).toEqual(1);
    });
  });
});
