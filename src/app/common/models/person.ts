import { IPerson, IStudent, ITeacher } from '../entities/person';
import { IExtendedModel } from '../entities/extended-model';
import * as _ from 'lodash';

export class Person implements IPerson, IExtendedModel<Person> {
  public _id: string;
  public firstName: string;
  public lastName: string;
  public address: string;
  public description: string;

  constructor({ _id = '', firstName = '', lastName = '', address = '', description = '' }: IPerson = {} as Person) {
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.description = description;
  }

  public isEqual(other: Person): boolean {
    return _.isEqual(this, other);
  }

  public getCopy(): Person {
    return _.cloneDeep(this);
  }

  public isValid(): boolean {
    return this.firstName && this.lastName ? true : false;
  }

}

export class Student extends Person implements IStudent {
}

export class Teacher extends Person implements ITeacher {
}
