import { Mark, Journal, Day } from '../entities/journal';
import * as _ from 'lodash';
import { Student } from '../entities/person';
import { DaysMark } from '../entities/form';

function getAverageMark(marks: DaysMark): number {
  marks = _.filter(marks, (mark: number) => mark !== null);
  return _.reduce(marks, (sum: number, mark: number) => sum + mark, 0) / marks.length;
}

function getDaysMarks(journal: Journal, studentIdx: number): DaysMark {
  return _.reduce(journal.days, (daysMark: DaysMark, day: Day) => ({
    ...daysMark,
    [day.name]: day.marks[studentIdx].value
  }), {});
}

export function getJournalTableForm(students: Student[], journal: Journal) {
  return _.map(students, (student: Student, studentIdx: number) => {
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

export function getWorkDays(journal: Journal): string[] {
  return _.map(journal.days, 'name');
}
