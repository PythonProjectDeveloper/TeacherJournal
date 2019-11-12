import { ISubject } from '../entities/subject';
import { IExtendedModel } from '../entities/extended-model';
import * as _ from 'lodash';

export class Subject implements ISubject, IExtendedModel<Subject> {
  public _id: string;
  public name: string;
  public teacher: string;
  public cabinet: string;
  public description: string;

  constructor({
    _id = '',
    name = '',
    teacher = '',
    cabinet = '',
    description = ''
  }: ISubject = {} as Subject) {
    this._id = _id;
    this.name = name;
    this.teacher = teacher;
    this.cabinet = cabinet;
    this.description = description;
  }

  public isEqual(other: Subject): boolean {
    return _.isEqual(this, other);
  }

  public getCopy(): Subject {
    return _.cloneDeep(this);
  }

  public isValid(): boolean {
    return this.name && this.teacher ? true : false;
  }
}
