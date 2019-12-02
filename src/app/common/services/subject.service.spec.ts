import { SubjectService } from './subject.service';
import { of, Observable } from 'rxjs';
import { ConverterService } from './converter.service';
import { Subject } from '../models/subject';

const filterData: string = 'some data';
const responseObject: any = {};
const responseObjects: any[] = [{}, {}, {}];
const filteredResponseObjects: any[] = [{}, {}];
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

  public get(url: string, _: any , httpOptions: any): Observable<any> {
    if (url.endsWith(id)) { return of(responseObject); }

    const param: any = httpOptions.params.updates.pop();

    if (param && param.value === filterData) { return of(filteredResponseObjects); }

    return of(responseObjects);
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
      service.getSubjects().subscribe(subjects => {
        subjects.forEach(subject =>
          expect(subject instanceof Subject).toEqual(true)
        );

        expect(subjects.length).toEqual(3);
      });
    });

    it('should add filter data to request params', () => {
      service.getSubjects(filterData).subscribe(subjects => {
        subjects.forEach(subject =>
          expect(subject instanceof Subject).toEqual(true)
        );

        expect(subjects.length).toEqual(2);
      });
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
