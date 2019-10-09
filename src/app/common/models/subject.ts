import { ISubject } from '../entities/subject';
import { ExtendedModel } from '../entities/extended-model';
import * as _ from 'lodash';

export class Subject implements ISubject, ExtendedModel<Subject> {
  public id: string;
  public name: string;
  public teacherId: string;
  public cabinet: string;
  public description: string;

  constructor(id: string = '', name: string = '', teacherId: string = '', cabinet: string = '', description: string = '') {
    this.id = id;
    this.name = name;
    this.teacherId = teacherId;
    this.cabinet = cabinet;
    this.description = description;
  }

  public isEqual(other: Subject): boolean {
    return _.isEqual(this, other);
  }

  public getCopy(): Subject {
    return _.cloneDeep(this);
  }
}
