import { IMark, IJournal, IDay } from '../entities/journal';
import * as _ from 'lodash';
import { IStudent } from '../entities/person';
import { IDaysMark } from '../entities/form';

function getAverageMark(marks: IDaysMark): number {
  marks = _.filter(marks, (mark: number) => mark !== null);
  return _.reduce(marks, (sum: number, mark: number) => sum + mark, 0) / marks.length;
}

function getDaysMarks(journal: IJournal, studentIdx: number): IDaysMark {
  return _.reduce(journal.days, (daysMark: IDaysMark, day: IDay) => ({
    ...daysMark,
    [day.name]: day.marks[studentIdx].value
  }), {});
}

export function getJournalTableForm(students: IStudent[], journal: IJournal) {
  return _.map(students, (student: IStudent, studentIdx: number) => {
    const studentDaysMarks = getDaysMarks(journal, studentIdx);
    const averageMark = getAverageMark(studentDaysMarks);

    return {
      firstName: student.firstName,
      lastName: student.lastName,
      averageMark,
      ...studentDaysMarks
    };
  });
}

export function getWorkDays(journal: IJournal): string[] {
  return _.map(journal.days, 'name');
}

export function getSimpleCopy(obj: any) {
  return Object.assign( Object.create( Object.getPrototypeOf(obj)), obj);
}
