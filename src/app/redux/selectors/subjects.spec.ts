import { initialState } from '../reducers/subjects';
import { getSubjectState, getSubjects, getSubject, getFilterText, getJournal } from './subjects';

describe('Subjects selectors', () => {
  const globalState: any = { subjects: initialState };

  describe('#getSubjectState', () => {
    it('should return subject store', () => {
      expect(getSubjectState(globalState)).toEqual(initialState);
    });
  });

  describe('#getSubjects', () => {
    it('should return array of subjects', () => {
      expect(getSubjects(globalState)).toEqual(initialState.subjects);
    });
  });

  describe('#getSubject', () => {
    it('should return subject', () => {
      expect(getSubject(globalState)).toEqual(initialState.subject);
    });
  });

  describe('#getFilterText', () => {
    it('should return filter text', () => {
      expect(getFilterText(globalState)).toEqual(initialState.filterText);
    });
  });

  describe('#getJournal', () => {
    it('should return journal', () => {
      expect(getJournal(globalState)).toEqual(initialState.journal);
    });
  });
});
