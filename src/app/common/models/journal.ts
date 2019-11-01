import { IJournal, IStudentMark } from '../entities/journal';
import { IExtendedModel } from '../entities/extended-model';
import * as _ from 'lodash';
import { dropLastEmptyItems } from '../helpers/calculations';

export class Journal implements IJournal, IExtendedModel<Journal> {
  public id: string;
  public subjectName: string;
  public dayNames: string[];
  public studentMarks: IStudentMark[];

  constructor({ id = '', subjectName= '', dayNames = [], studentMarks = [] }: IJournal = {} as Journal) {
    this.id = id;
    this.subjectName = subjectName;
    this.dayNames = dayNames;
    this.studentMarks = studentMarks;
  }

  public isEqual(other: Journal): boolean {
    const isIdEqual: boolean = this.id === other.id;
    const isDayNamesEqual: boolean = _.isEqual(
      dropLastEmptyItems(this.dayNames),
      dropLastEmptyItems(other.dayNames)
    );

    for (const index of Object.keys(this.studentMarks)) {
      const isMarksEqual: boolean = _.isEqual(
        dropLastEmptyItems(this.studentMarks[index].marks),
        dropLastEmptyItems(other.studentMarks[index].marks)
      );

      if (!isMarksEqual) { return isMarksEqual; }
    }

    return isIdEqual && isDayNamesEqual;
  }

  public getCopy(): Journal {
    return _.cloneDeep(this);
  }

  public updateDayName(index: number, value: string): void {
    this.dayNames[index] = value;
  }

  public updateMark(studentId: string, index: number, value: string): void {
    const studentMark: IStudentMark = _.find(this.studentMarks, { studentId });
    studentMark.marks[index] = parseInt(value, 10) || null;
  }

  public addColumn(): void {
    this.dayNames.push('');
    this.studentMarks.forEach((userMarks) => userMarks.marks.push(null));
  }

  public removeColumn(index: number): void {
    this.dayNames.splice(index, 1);
    this.studentMarks.forEach((userMarks) => userMarks.marks.splice(index, 1));
  }

  public isValid(): boolean {
    return this.dayNames.reduce((isFill, name) => isFill ? Boolean(name) : isFill, true);
  }
}
