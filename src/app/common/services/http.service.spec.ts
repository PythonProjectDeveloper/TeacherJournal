import { HttpService } from './http.service';
import { Observable, of, throwError } from 'rxjs';

const returnData: string = 'return data';
class TestHttpClient {
  public post(): Observable<any> {
    return of(returnData);
  }

  public put(): Observable<any> {
    return of(returnData);
  }

  public delete(): Observable<any> {
    return of(returnData);
  }

  public get(): Observable<any> {
    return of(returnData);
  }
}

class TestErrorHttpClient {
  public post(): Observable<any> {
    return throwError({});
  }

  public put(): Observable<any> {
    return throwError({});
  }

  public delete(): Observable<any> {
    return throwError({});
  }

  public get(): Observable<any> {
    return throwError({});
  }
}

class TestLogService {
  public handleHttpError(error: any, defaultValue: any): Observable<any> {
    return of(defaultValue);
  }
}

describe('HttpService', () => {
  const url: string = 'some url';
  const body: string = 'some body';
  const defaultData: string = 'defaultData';
  const testHttpClient: any = new TestHttpClient();
  const testErrorHttpClient: any = new TestErrorHttpClient();
  const testLogService: any = new TestLogService();

  describe('#post', () => {
    it('should return observable result of request', () => {
      const service: HttpService =  new HttpService(testHttpClient, testLogService);

      service.post(url, body, defaultData).subscribe(data => {
        expect(data).toEqual(returnData);
      });
    });

    it('should return observable defaulValue if there is a error', () => {
      const service: HttpService =  new HttpService(testErrorHttpClient, testLogService);

      service.post(url, body, defaultData).subscribe(data => {
        expect(data).toEqual(defaultData);
      });
    });
  });

  describe('#put', () => {
    it('should return observable result of request', () => {
      const service: HttpService =  new HttpService(testHttpClient, testLogService);

      service.put(url, body, defaultData).subscribe(data => {
        expect(data).toEqual(returnData);
      });
    });

    it('should return observable defaulValue if there is a error', () => {
      const service: HttpService =  new HttpService(testErrorHttpClient, testLogService);

      service.put(url, body, defaultData).subscribe(data => {
        expect(data).toEqual(defaultData);
      });
    });
  });

  describe('#delete', () => {
    it('should return observable result of request', () => {
      const service: HttpService =  new HttpService(testHttpClient, testLogService);

      service.delete(url, defaultData).subscribe(data => {
        expect(data).toEqual(returnData);
      });
    });

    it('should return observable defaulValue if there is a error', () => {
      const service: HttpService =  new HttpService(testErrorHttpClient, testLogService);

      service.delete(url, defaultData).subscribe(data => {
        expect(data).toEqual(defaultData);
      });
    });
  });

  describe('#get', () => {
    it('should return observable result of request', () => {
      const service: HttpService =  new HttpService(testHttpClient, testLogService);

      service.get(url, defaultData).subscribe(data => {
        expect(data).toEqual(returnData);
      });
    });

    it('should return observable defaulValue if there is a error', () => {
      const service: HttpService =  new HttpService(testErrorHttpClient, testLogService);

      service.get(url, defaultData).subscribe(data => {
        expect(data).toEqual(defaultData);
      });
    });
  });
});
