import { SubjectService } from './subject.service';
import { of, Observable } from 'rxjs';
import { ConverterService } from './converter.service';
import { Subject } from '../models/subject';

const responseObject: any = {};
const responseObjects: any[] = [{}, {}, {}];
const id: string = '_ID_';

class TestHttpClient {
  public post(): Observable<any> {
    return of(responseObject);
  }

  public put(): Observable<any> {
    return of(responseObject);
  }

  public delete(): Observable<any> {
    return of(responseObject);
  }

  public get(url: string): Observable<any> {
    return url.endsWith(id) ? of(responseObject) : of(responseObjects);
  }
}

describe('SubjectService', () => {
  const testHttpService: any = new TestHttpClient();
  const convertService: any = new ConverterService();
  const service: SubjectService =  new SubjectService(testHttpService, convertService);
  const stubSubject: Subject = new Subject();

  describe('#createSubject', () => {
    it('should return observable converted result of request', () => {
      service.createSubject(stubSubject).subscribe(subject =>
        expect(subject instanceof Subject).toEqual(true)
      );
    });
  });

  describe('#updateSubject', () => {
    it('should return observable converted result of request', () => {
      service.updateSubject(stubSubject).subscribe(subject =>
        expect(subject instanceof Subject).toEqual(true)
      );
    });
  });

  describe('#deleteSubject', () => {
    it('should return observable converted result of request', () => {
      service.deleteSubject(stubSubject).subscribe(subject =>
        expect(subject instanceof Subject).toEqual(true)
      );
    });
  });

  describe('#getSubjects', () => {
    it('should return observable converted result of request', () => {
      service.getSubjects().subscribe(subjects =>
        subjects.forEach(subject =>
          expect(subject instanceof Subject).toEqual(true)
        )
      );
    });
  });

  describe('#getSubject', () => {
    it('should return observable converted result of request', () => {
      service.getSubject(id).subscribe(subject =>
        expect(subject instanceof Subject).toEqual(true)
      );
    });
  });
});
