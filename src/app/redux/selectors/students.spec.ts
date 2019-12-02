import { initialState } from '../reducers/students';
import { getStudentState, getStudents, getStudent, getFilterData } from './students';

describe('Students selectors', () => {
  const globalState: any = { students: initialState };

  describe('#getStudentState', () => {
    it('should return student store', () => {
      expect(getStudentState(globalState)).toEqual(initialState);
    });
  });

  describe('#getStudents', () => {
    it('should return array of students', () => {
      expect(getStudents(globalState)).toEqual(initialState.students);
    });
  });

  describe('#getStudent', () => {
    it('should return student', () => {
      expect(getStudent(globalState)).toEqual(initialState.student);
    });
  });

  describe('#getFilterData', () => {
    it('should return filter text', () => {
      expect(getFilterData(globalState)).toEqual(initialState.filterData);
    });
  });
});
