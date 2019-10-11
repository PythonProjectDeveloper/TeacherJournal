import { ISubject } from '../entities/subject';
import { ExtendedModel } from '../entities/extended-model';
import * as _ from 'lodash';

export class Subject implements ISubject, ExtendedModel<Subject> {
  public id: string;
  public name: string;
  public teacherId: string;
  public journalId: string;
  public cabinet: string;
  public description: string;

  constructor({
    id = '',
    name = '',
    teacherId = '',
    journalId = '',
    cabinet = '',
    description = ''
  }: ISubject = {} as Subject) {
    this.id = id;
    this.name = name;
    this.teacherId = teacherId;
    this.journalId = journalId;
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
