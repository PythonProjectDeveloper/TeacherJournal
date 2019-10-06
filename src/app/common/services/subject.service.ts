import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { subjects } from '../constants/constants-subject';
import { ISubject } from '../entities/subject';
import uuid4 from 'uuid4';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private subjects = subjects;
  private dataChanged: BehaviorSubject<ISubject[]>;

  constructor() {
    this.dataChanged = new BehaviorSubject<ISubject[]>(this.subjects);
  }

  public create(subject: ISubject) {
    subject.id = uuid4();
    this.subjects = [subject, ...this.subjects];
    this.dataChanged.next(this.subjects);

    return subject.id;
  }

  public update(subject: ISubject) {
    const index = _.findIndex(this.subjects, { 'id': subject.id});
    this.subjects.splice(index, 1, subject);
  }

  public delete(subject: ISubject) {
    this.subjects = _.filter(
      this.subjects,
      (currentSubject: ISubject) => currentSubject.id !== subject.id
    );

    this.dataChanged.next(this.subjects);
  }

  public getSubjects(): BehaviorSubject<ISubject[]> {
    return this.dataChanged;
  }

  public getSubject(id: string): ISubject {
    const subject =  _.find(this.subjects, { 'id': id });

    return subject || this.getNewSubject();
  }

  private getNewSubject(): ISubject {
    return {
      id: '',
      name: '',
      teacherId: '',
      cabinet: '',
      description: ''
    };
  }

}
