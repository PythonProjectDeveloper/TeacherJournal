import { IPerson, IStudent, ITeacher } from '../entities/person';
import { ExtendedModel } from '../entities/extended-model';
import * as _ from 'lodash';

export class Person implements IPerson, ExtendedModel<Person> {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;
  
  constructor(id: string = '', firstName: string = '', lastName: string = '', address: string = '', description: string = '') {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.description = description;
  }

  isEqual(other: Person): boolean {
    return _.isEqual(this, other);
  }
  
  getCopy(): Person {
    return _.cloneDeep(this);
  }

}

export class Student extends Person implements IStudent {
}

export class Teacher extends Person implements ITeacher {
}
