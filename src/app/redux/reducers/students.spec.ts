import { initialState, reducer } from '../reducers/students';
import { setStudents, setStudent, setFilterText } from '../actions/students';

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

  describe('#setFilterText', () => {
    it('should set filter text', () => {
      const filterText: any = 'test data';
      const action: any = setFilterText({ filterText });
      const result: any = reducer(initialState, action);

      expect(result.filterText).toEqual(filterText);
    });
  });
});
