import { initialState, reducer } from '../reducers/students';
import { setStudents, setStudent, setFilterData } from '../actions/students';

describe('Student selectors', () => {
  describe('#setStudents', () => {
    it('should set students', () => {
      const students: any = 'test data';
      const action: any = setStudents({ students });
      const result: any = reducer(initialState, action);

      expect(result.students).toEqual(students);
    });
  });

  describe('#setStudent', () => {
    it('should set student', () => {
      const student: any = 'test data';
      const action: any = setStudent({ student });
      const result: any = reducer(initialState, action);

      expect(result.student).toEqual(student);
    });
  });

  describe('#setFilterData', () => {
    it('should set filter text', () => {
      const filterData: any = 'test data';
      const action: any = setFilterData({ filterData });
      const result: any = reducer(initialState, action);

      expect(result.filterData).toEqual(filterData);
    });
  });
});
