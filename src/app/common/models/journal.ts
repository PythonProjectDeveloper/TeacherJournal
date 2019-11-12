import { IJournal, IDay } from '../entities/journal';
import { IExtendedModel } from '../entities/extended-model';
import * as _ from 'lodash';
import { dropLastEmptyItems } from '../helpers/calculations';
import { IStudent } from '../entities/person';
import { ISubject } from '../entities/subject';

export class Journal implements IJournal/*, IExtendedModel<Journal> */{
  public _id: string;
  public subject: ISubject;
  public students: IStudent[];
  public days: IDay[];

  constructor({ _id = '', subject = null, students = [], days = [] }: IJournal = {} as Journal) {
    this._id = _id;
    this.subject = subject;
    this.students = students;
    this.days = days;
  }

  // public isEqual(other: Journal): boolean {
  //   const isIdEqual: boolean = this._id === other._id;
  //   const isDayNamesEqual: boolean = _.isEqual(
  //     dropLastEmptyItems(this.dayNames),
  //     dropLastEmptyItems(other.dayNames)
  //   );

  //   for (const index of Object.keys(this.studentMarks)) {
  //     const isMarksEqual: boolean = _.isEqual(
  //       dropLastEmptyItems(this.studentMarks[index].marks),
  //       dropLastEmptyItems(other.studentMarks[index].marks)
  //     );

  //     if (!isMarksEqual) { return isMarksEqual; }
  //   }

  //   return isIdEqual && isDayNamesEqual;
  // }

  public getCopy(): Journal {
    return _.cloneDeep(this);
  }

  // public updateDayName(index: number, value: string): void {
  //   this.dayNames[index] = value;
  // }

  // public updateMark(studentId: string, index: number, value: string): void {
  //   const studentMark: IStudentMark = _.find(this.studentMarks, { studentId });
  //   studentMark.marks[index] = parseInt(value, 10) || null;
  // }

  // public addColumn(): void {
  //   this.dayNames.push('');
  //   this.studentMarks.forEach((userMarks) => userMarks.marks.push(null));
  // }

  // public removeColumn(index: number): void {
  //   this.dayNames.splice(index, 1);
  //   this.studentMarks.forEach((userMarks) => userMarks.marks.splice(index, 1));
  // }

  public isValid(): boolean {
    return this.days.reduce((isFill, day) => isFill ? Boolean(day.name) : isFill, true);
  }
}
