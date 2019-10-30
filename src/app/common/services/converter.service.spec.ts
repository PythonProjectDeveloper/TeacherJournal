import { TestBed } from '@angular/core/testing';

import { ConverterService } from './converter.service';
import { of, Observable } from 'rxjs';

class TestClass {
  public data: any;
  constructor(data: any) {
    this.data = data;
  }
}

describe('ConverterService', () => {
  let service: ConverterService;
  beforeEach(() => service = new ConverterService());

  describe('#convertToObject', () => {
    it('should create new instance of sended class with sended data', () => {
      const data: any = { value: 5 };
      const observableData: Observable<any> = of(data);

      service.convertToObject<TestClass>(observableData, TestClass).subscribe(inst => {
          expect(inst instanceof TestClass).toEqual(true);
          expect(inst.data).toEqual(data);
      });
    });
  });

  describe('#convertToObjects', () => {

    it('should create new instance sended class for each data in array', () => {
      const data: number[] = [1, 2, 3];
      const observableData: Observable<any> = of(data);

      service.convertToObjects<TestClass>(observableData, TestClass).subscribe(array => {
        expect(array.length).toEqual(data.length);

        data.forEach((_, idx) => {
          expect(array[idx] instanceof TestClass).toEqual(true);
          expect(array[idx].data).toEqual(data[idx]);
        });
      });
    });
  });
});
