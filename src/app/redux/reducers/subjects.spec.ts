import { initialState, reducer } from '../reducers/subjects';
import { setSubjects, setSubject, setFilterText, setJournal } from '../actions/subjects';

describe('Subject selectors', () => {
  describe('#setSubjects', () => {
    it('should set subjects', () => {
      const subjects: any = 'test data';
      const action: any = setSubjects({ subjects });
      const result: any = reducer(initialState, action);

      expect(result.subjects).toEqual(subjects);
    });
  });

  describe('#setSubject', () => {
    it('should set subject', () => {
      const subject: any = 'test data';
      const action: any = setSubject({ subject });
      const result: any = reducer(initialState, action);

      expect(result.subject).toEqual(subject);
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

  describe('#setJournal', () => {
    it('should set journal', () => {
      const journal: any = 'test data';
      const action: any = setJournal({ journal });
      const result: any = reducer(initialState, action);

      expect(result.journal).toEqual(journal);
    });
  });
});
