import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { subjects } from '../constants/constants-subject';
import { Subject } from '../entities/subject';
import uuid4 from 'uuid4';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private subjects = subjects;
  private dataChanged: BehaviorSubject<Subject[]>;

  constructor() {
    this.dataChanged = new BehaviorSubject<Subject[]>(this.subjects);
  }

  public create(subject: Subject) {
    subject.id = uuid4();
    this.subjects = [subject, ...this.subjects];
    this.dataChanged.next(this.subjects);

    return subject.id;
  }

  public update(subject: Subject) {
    const index = _.findIndex(this.subjects, { 'id': subject.id});
    this.subjects.splice(index, 1, subject);
  }

  public delete(subject: Subject) {
    this.subjects = _.filter(
      this.subjects,
      (currentSubject: Subject) => currentSubject.id !== subject.id
    );

    this.dataChanged.next(this.subjects);
  }

  public getSubjects(): BehaviorSubject<Subject[]> {
    return this.dataChanged;
  }

  public getSubject(id: string): Subject {
    const subject =  _.find(this.subjects, { 'id': id });

    return subject || this.getNewSubject();
  }

  private getNewSubject(): Subject {
    return {
      id: '',
      name: '',
      teacherId: '',
      cabinet: '',
      description: ''
    };
  }

}
