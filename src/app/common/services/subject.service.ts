import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { subjects } from '../constants/constants-subject';
import uuid4 from 'uuid4';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private subjects: Subject[] = [];

  constructor() {
    this.subjects = _.map(subjects, (subject: Subject) =>
      new Subject(
        subject.id,
        subject.name,
        subject.teacherId,
        subject.cabinet,
        subject.description
      )
    );
  }

  public createSubject(subject: Subject): Observable<Subject>  {
    subject.id = uuid4();
    this.subjects = [subject, ...this.subjects];

    return of(subject)
  }

  public updateSubject(subject: Subject): Observable<Subject> {
    const index = _.findIndex(this.subjects, { 'id': subject.id });
    this.subjects.splice(index, 1, subject);

    return of(subject)
  }

  public deleteSubject(subject: Subject): Observable<Subject[]> {
    this.subjects = _.filter(
      this.subjects,
      (currentSubject: Subject) => currentSubject.id !== subject.id
    );

    return of(this.subjects);
  }

  public getSubjects(): Observable<Subject[]> {
    return of(this.subjects);
  }

  public getSubject(id: string): Observable<Subject> {
    const subject =  _.find(this.subjects, { 'id': id });

    return of(subject || new Subject());
  }

}
