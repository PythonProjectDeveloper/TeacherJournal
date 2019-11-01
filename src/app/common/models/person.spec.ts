import { Person } from './person';

describe('Person', () => {
  const data1: any = { id: 'x', firstName: 'x', lastName: 'x', address: 'x', description: 'x' };
  const data2: any = { id: 'o', firstName: 'o', lastName: 'o', address: 'o', description: 'o' };
  const emptyData: any = { id: 'x', firstName: '', lastName: '', address: 'x', description: 'x' };

  describe('#isEqual', () => {
    it('should return true if fields are equal, otherwise false', () => {
      const person1: Person = new Person(data1);
      const person2: Person = new Person(data1);
      const person3: Person = new Person(data2);

      expect(person1.isEqual(person2)).toEqual(true);
      expect(person1.isEqual(person3)).toEqual(false);
    });
  });

  describe('#getCopy', () => {
    it('should return deep copy of object', () => {
      const person1: Person = new Person(data1);
      const person2: Person = person1.getCopy();

      expect(person1).not.toBe(person2);
      expect(person1).toEqual(person2);
    });
  });

  describe('#isValid', () => {
    it('should return true if first name and last name are not empty, otherwise false', () => {
      const person1: Person = new Person(data1);
      const person2: Person = new Person(emptyData);

      expect(person1.isValid()).toEqual(true);
      expect(person2.isValid()).toEqual(false);
    });
  });
});
