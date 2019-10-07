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
  private persons: Person[] = [];
  private dataChanged: BehaviorSubject<Person[]>;

  constructor() {
    this.persons = _.map(students, (person: Person) =>
      new Student(
        person.id,
        person.firstName,
        person.lastName,
        person.address,
        person.description
      )
    );
    this.dataChanged = new BehaviorSubject<Person[]>(this.persons);
  }

  public createStudent(person: Person) {
    person.id = uuid4();
    this.persons = [person, ...this.persons];
    this.dataChanged.next(this.persons);
  }

  public updateStudent(person: Person) {
    const index = _.findIndex(this.persons, { 'id': person.id });
    this.persons.splice(index, 1, person);
  }

  public deleteStudent(person: Person) {
    this.persons = _.filter(
      this.persons,
      (currentStudent: Person) => currentStudent.id !== person.id
    );

    this.dataChanged.next(this.persons);
  }

  public getStudents(): BehaviorSubject<Person[]> {
    return this.dataChanged;
  }

  public getStudent(id: string): Person {
    const person =  _.find(this.persons, { 'id': id });

    return person || new Student();
  }

}

