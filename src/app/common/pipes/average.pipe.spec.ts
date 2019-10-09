import { AveragePipe } from './average.pipe';

describe('AveragePipe', () => {
  it('create an instance', () => {
    const pipe: AveragePipe = new AveragePipe();
    expect(pipe).toBeTruthy();
  });
});
