import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { subjects } from '../constants/constants-subject';
import { Subject } from '../entities/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  subjects = subjects;

  constructor() { }

  create(subject: Subject) {
    subjects.splice(0, 0, subject);
  }

  update(subject: Subject) {
    const index = _.findIndex(subject, { 'id': subject.id});
    subjects.splice(index, 1, subject);
  }

  delete(subject: Subject) {
    const index = _.findIndex(subject, { 'id': subject.id});
    subjects.splice(index, 1);
  }

}
