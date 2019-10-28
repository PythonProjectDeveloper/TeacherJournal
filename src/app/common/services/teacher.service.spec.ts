import { TeacherService } from './teacher.service';
import { ConverterService } from './converter.service';
import { of, Observable } from 'rxjs';
import { Person } from '../models/person';

const responseObject: any[] = [{}, {}, {}];
class TestHttpClient {
  public get(): Observable<any> {
    return of(responseObject);
  }
}

describe('TeacherService', () => {
  const testHttpService: any = new TestHttpClient();
  const convertService: any = new ConverterService();

  describe('#getTeachers', () => {
    it('should return observable converted result of request', () => {
      const service: TeacherService =  new TeacherService(testHttpService, convertService);

      service.getTeachers().subscribe(teachers => {
        expect(teachers.length).toEqual(responseObject.length);

        teachers.forEach((teacher) =>
          expect(teacher instanceof Person).toEqual(true)
        );
      });
    });
  });
});
