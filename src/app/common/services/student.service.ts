import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { students } from '../constants/constants-person';
import { Student } from '../entities/person';
import uuid4 from 'uuid4';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students = students;
  public dataChanged: BehaviorSubject<Student[]>;

  constructor() {
    this.dataChanged = new BehaviorSubject<Student[]>(this.students);
  }

  public create(student: Student) {
    student.id = uuid4();
    this.students = [student, ...this.students];
    this.dataChanged.next(this.students);

    return student.id;
  }

  public update(student: Student) {
    const index = _.findIndex(this.students, { 'id': student.id});
    this.students.splice(index, 1, student);
  }

  public delete(student: Student) {
    this.students = _.filter(
      this.students,
      (currentStudent: Student) => currentStudent.id !== student.id
    );

    this.dataChanged.next(this.students);
  }

  public getStudents(): BehaviorSubject<Student[]> {
    return this.dataChanged;
  }

  public getStudent(id: string): Student {
    const student =  _.find(this.students, { 'id': id });

    return student || this.getNewStudent();
  }

  private getNewStudent(): Student {
    return {
      id: '',
      firstName: '',
      lastName: '',
      address: '',
      description: ''
    };
  }

}

