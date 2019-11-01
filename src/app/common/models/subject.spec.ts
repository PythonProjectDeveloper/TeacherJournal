import { Subject } from './subject';

describe('Subject', () => {
  const data1: any = { id: 'x', name: 'x', teacherId: 'x', journalId: 'x', cabinet: 'x', description: 'x' };
  const data2: any = { id: 'o', name: 'o', teacherId: 'o', journalId: '0', cabinet: 'o', description: 'o' };
  const emptyData: any = { id: 'x', name: '', teacherId: '', journalId: 'x', cabinet: 'x', description: 'x' };

  describe('#isEqual', () => {
    it('should return true if fields are equal, otherwise false', () => {
      const subject1: Subject = new Subject(data1);
      const subject2: Subject = new Subject(data1);
      const subject3: Subject = new Subject(data2);

      expect(subject1.isEqual(subject2)).toEqual(true);
      expect(subject1.isEqual(subject3)).toEqual(false);
    });
  });

  describe('#getCopy', () => {
    it('should return deep copy of object', () => {
      const subject1: Subject = new Subject(data1);
      const subject2: Subject = subject1.getCopy();

      expect(subject1).not.toBe(subject2);
      expect(subject1).toEqual(subject2);
    });
  });

  describe('#isValid', () => {
    it('should return true if name and teacherId are not empty, otherwise false', () => {
      const subject1: Subject = new Subject(data1);
      const subject2: Subject = new Subject(emptyData);

      expect(subject1.isValid()).toEqual(true);
      expect(subject2.isValid()).toEqual(false);
    });
  });
});
