import { JournalService } from './journal.service';
import { Journal } from '../models/journal';
import { Observable, of } from 'rxjs';
import { ConverterService } from './converter.service';

const responseObject: any = {};

class TestHttpClient {
  public put(): Observable<any> {
    return of(responseObject);
  }

  public get(): Observable<any> {
    return of(responseObject);
  }
}

describe('JournalService', () => {
  const testHttpService: any = new TestHttpClient();
  const convertService: any = new ConverterService();
  const service: JournalService =  new JournalService(testHttpService, convertService);
  const stubJournal: Journal = new Journal();

  describe('#updateJournal', () => {
    it('should return observable converted result of request', () => {
      service.updateJournal(stubJournal).subscribe(journal =>
        expect(journal instanceof Journal).toEqual(true)
      );
    });
  });

  describe('#getJournal', () => {
    it('should return observable converted result of request', () => {
      service.getJournal('').subscribe(journal =>
        expect(journal instanceof Journal).toEqual(true)
      );
    });
  });
});
