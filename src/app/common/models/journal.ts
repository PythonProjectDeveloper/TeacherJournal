import { IJournal, IStudentMark } from '../entities/journal';
import { ExtendedModel } from '../entities/extended-model';
import * as _ from 'lodash';
import { Person } from './person';
import { IDaysMark } from '../entities/form';

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
    return _.isEqual(this.dayNames, other.dayNames)
        && _.isEqual(this.studentMarks, other.studentMarks);
  }
  
  getCopy(): Journal {
    return _.cloneDeep(this);
  }

  updateDayName(index: string, value: string) {
    this.dayNames[index] = value;
  }

  updateMark(indexX: string, indexY: string, value: number) {
    this.studentMarks[indexX][indexY] = value;
  }

  addColumn() {
    this.dayNames.push('');
    this.studentMarks.forEach((userMarks) => userMarks.marks.push(null))
  }

  getDayNames(): string[] {
    return this.dayNames;
  }

  getJournalTableForm() {
    return this.studentMarks.map((sturentMark) => {
      const averageMark = _.mean(_.filter(sturentMark.marks, Boolean));
      const journalTableForm = {
        firstName: sturentMark.firstName,
        lastName: sturentMark.lastName,
        averageMark
      }
      
      this.dayNames.forEach((name, idx) =>
        journalTableForm[name] = sturentMark.marks[idx]
      );

      return journalTableForm;
    });
  }

}
