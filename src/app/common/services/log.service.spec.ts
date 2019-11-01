import { LogService } from './log.service';

describe('LogService', () => {
  describe('#handleHttpError', () => {
    const httpClient: any = { post: jasmine.createSpy() };
    const service: LogService = new LogService(httpClient);
    const error: any = { message: 'error' };
    const defaultValue: any = { data: 'data' };

    it('should send error message to log server', () => {
      service.handleHttpError(error, defaultValue);

      expect(httpClient.post).toHaveBeenCalled();
    });

    it('should print error message for user', () => {
      console.error = jasmine.createSpy();

      service.handleHttpError(error, defaultValue);

      expect(console.error).toHaveBeenCalled();
    });

    it('should return observable of defaultValue', () => {
      service.handleHttpError(error, defaultValue).subscribe( data =>
        expect(data).toEqual(defaultValue)
      );
    });
  });
});
