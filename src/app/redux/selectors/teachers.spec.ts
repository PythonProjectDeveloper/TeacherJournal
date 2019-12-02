import { initialState } from '../reducers/teachers';
import { getTeachers } from './teachers';

describe('Teachers selectors', () => {
  const globalState: any = { teachers: initialState };

  describe('#getTeachers', () => {
    it('should return array of teachers', () => {
      expect(getTeachers(globalState)).toEqual(initialState.teachers);
    });
  });
});
