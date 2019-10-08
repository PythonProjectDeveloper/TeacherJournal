import { IJournal, IStudentMark } from '../entities/journal';
import { ExtendedModel } from '../entities/extended-model';
import * as _ from 'lodash';

export class Journal implements IJournal, ExtendedModel<Journal> {
  subjectId: string;
  dayNames: string[];
  studentMarks: IStudentMark[];
  
  constructor(subjectId: string = '', dayNames: string[] = [], studentMarks: IStudentMark[] = []) {
    this.subjectId = subjectId;
    this.dayNames = dayNames;
    this.studentMarks = studentMarks;
  }

  isEqual(other: Journal): boolean {
    return _.isEqual(this, other);
  }
  
  getCopy(): Journal {
    return _.cloneDeep(this);
  }

  updateDayName(index: number, value: string) {
    this.dayNames[index] = value;
  }

  updateMark(studentId: string, index: number, value: string) {
    const studentMark = _.find(this.studentMarks, { 'studentId': studentId })
    studentMark.marks[index] = parseInt(value, 10) || null;
  }

  addColumn() {
    this.dayNames.push('');
    this.studentMarks.forEach((userMarks) => userMarks.marks.push(null))
  }
}
