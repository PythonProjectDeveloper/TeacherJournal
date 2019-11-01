import { StudentService } from './student.service';
import { of, Observable } from 'rxjs';
import { ConverterService } from './converter.service';
import { Person } from '../models/person';

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

describe('StudentService', () => {
  const testHttpService: any = new TestHttpClient();
  const convertService: any = new ConverterService();
  const service: StudentService =  new StudentService(testHttpService, convertService);
  const stubStudent: Person = new Person();

  describe('#createStudent', () => {
    it('should return observable converted result of request', () => {
      service.createStudent(stubStudent).subscribe(student =>
        expect(student instanceof Person).toEqual(true)
      );
    });
  });

  describe('#updateStudent', () => {
    it('should return observable converted result of request', () => {
      service.updateStudent(stubStudent).subscribe(student =>
        expect(student instanceof Person).toEqual(true)
      );
    });
  });

  describe('#deleteStudent', () => {
    it('should return observable converted result of request', () => {
      service.deleteStudent(stubStudent).subscribe(student =>
        expect(student instanceof Person).toEqual(true)
      );
    });
  });

  describe('#getStudents', () => {
    it('should return observable converted result of request', () => {
      service.getStudents().subscribe(students => {
        students.forEach(student =>
          expect(student instanceof Person).toEqual(true)
        );

        expect(students.length).toEqual(3);
      });
    });

    it('should add filter data to request params', () => {
      service.getStudents(filterData).subscribe(students => {
        students.forEach(student =>
          expect(student instanceof Person).toEqual(true)
        );

        expect(students.length).toEqual(2);
      });
    });
  });

  describe('#getStudent', () => {
    it('should return observable converted result of request', () => {
      service.getStudent(id).subscribe(student =>
        expect(student instanceof Person).toEqual(true)
      );
    });
  });
});
