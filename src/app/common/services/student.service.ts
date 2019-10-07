import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { students } from '../constants/constants-person';
import uuid4 from 'uuid4';
import { BehaviorSubject } from 'rxjs';
import { Student, Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Person[] = [];
  private dataChanged: BehaviorSubject<Person[]>;

  constructor() {
    this.students = _.map(students, (student: Person) =>
      new Student(
        student.id,
        student.firstName,
        student.lastName,
        student.address,
        student.description
      )
    );
    this.dataChanged = new BehaviorSubject<Person[]>(this.students);
  }

  public create(student: Person) {
    student.id = uuid4();
    this.students = [student, ...this.students];
    this.dataChanged.next(this.students);
  }

  public update(student: Person) {
    const index = _.findIndex(this.students, { 'id': student.id});
    this.students.splice(index, 1, student);
  }

  public delete(student: Person) {
    this.students = _.filter(
      this.students,
      (currentStudent: Person) => currentStudent.id !== student.id
    );

    this.dataChanged.next(this.students);
  }

  public getStudents(): BehaviorSubject<Person[]> {
    return this.dataChanged;
  }

  public getStudent(id: string): Person {
    const student =  _.find(this.students, { 'id': id });

    return student || new Student();
  }

}

