import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { students } from '../constants/constants-person';
import { IStudent } from '../entities/person';
import uuid4 from 'uuid4';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students = students;
  private dataChanged: BehaviorSubject<IStudent[]>;

  constructor() {
    this.dataChanged = new BehaviorSubject<IStudent[]>(this.students);
  }

  public create(student: IStudent) {
    student.id = uuid4();
    this.students = [student, ...this.students];
    this.dataChanged.next(this.students);

    return student.id;
  }

  public update(student: IStudent) {
    const index = _.findIndex(this.students, { 'id': student.id});
    this.students.splice(index, 1, student);
  }

  public delete(student: IStudent) {
    this.students = _.filter(
      this.students,
      (currentStudent: IStudent) => currentStudent.id !== student.id
    );

    this.dataChanged.next(this.students);
  }

  public getStudents(): BehaviorSubject<IStudent[]> {
    return this.dataChanged;
  }

  public getStudent(id: string): IStudent {
    const student =  _.find(this.students, { 'id': id });

    return student || this.getNewStudent();
  }

  private getNewStudent(): IStudent {
    return {
      id: '',
      firstName: '',
      lastName: '',
      address: '',
      description: ''
    };
  }

}

