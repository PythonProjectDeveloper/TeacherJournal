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
    const drop = (array: any) => _.dropRightWhile(array, (item: any) => !item);
    const isSubjectIdEqual = this.subjectId === other.subjectId;
    const isDayNamesEqual = _.isEqual(drop(this.dayNames), drop(other.dayNames));
    let isMarksEqual = true;

    for (const index in this.studentMarks) {
      isMarksEqual = _.isEqual(
        drop(this.studentMarks[index].marks),
        drop(other.studentMarks[index].marks)
      );

      if (!isMarksEqual) break;
    }

    return isSubjectIdEqual && isDayNamesEqual && isMarksEqual;
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
