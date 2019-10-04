import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { students } from '../constants/constants-person';
import { Student } from '../entities/person';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students = students;

  constructor() { }

  public create(student: Student) {
    students.splice(0, 0, student);
  }

  public update(student: Student) {
    const index = _.findIndex(students, { 'id': student.id});
    students.splice(index, 1, student);
  }

  public delete(student: Student) {
    const index = _.findIndex(students, { 'id': student.id});
    students.splice(index, 1);
  }

  public getStudents() {
    return this.students;
  }

  public getStudent(id: string) {
    return _.find(this.students, { 'id': id });
  }

}
