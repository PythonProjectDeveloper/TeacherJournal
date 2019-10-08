import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { students } from '../constants/constants-person';
import uuid4 from 'uuid4';
import { Observable, of } from 'rxjs';
import { Student, Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private persons: Person[] = [];

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
  }

  public createStudent(person: Person): Observable<Person> {
    person.id = uuid4();
    this.persons = [person, ...this.persons];

    return of(person)
  }

  public updateStudent(person: Person): Observable<Person> {
    const index = _.findIndex(this.persons, { 'id': person.id });
    this.persons.splice(index, 1, person);

    return of(person)
  }

  public deleteStudent(person: Person): Observable<Person[]> {
    this.persons = _.filter(
      this.persons,
      (currentStudent: Person) => currentStudent.id !== person.id
    );

    return of(this.persons);
  }

  public getStudents(): Observable<Person[]> {
    return of(this.persons);
  }

  public getStudent(id: string): Observable<Person> {
    const person =  _.find(this.persons, { 'id': id });

    return of(person || new Student());
  }

}

