import { ISubject } from '../entities/subject';
import { ExtendedModel } from '../entities/extended-model';
import { getSimpleCopy } from '../helpers/calculations';

export class Subject implements ISubject, ExtendedModel<Subject> {
  id: string;
  name: string;
  teacherId: string;
  cabinet: string;
  description: string;
  
  constructor(id: string = '', name: string = '', teacherId: string = '', cabinet: string = '', description: string = '') {
    this.id = id;
    this.name = name;
    this.teacherId = teacherId;
    this.cabinet = cabinet;
    this.description = description;
  }

  isEqual(other: Subject): boolean {
    return this.name === other.name
        && this.teacherId === other.teacherId
        && this.cabinet === other.cabinet
        && this.description === other.description;
  }

  getCopy(): Subject {
    return getSimpleCopy(this);
  }
}
