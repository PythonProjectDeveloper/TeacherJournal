import { initialState, reducer } from '../reducers/teachers';
import { setTeachers } from '../actions/teachers';

describe('Teacher selectors', () => {
  describe('#setTeachers', () => {
    it('should set teachers', () => {
      const teachers: any = 'test data';
      const action: any = setTeachers({ teachers });
      const result: any = reducer(initialState, action);

      expect(result.teachers).toEqual(teachers);
    });
  });
});
