import { Subject } from '../models/subject';
import { Student } from '../models/person';
import { Journal } from '../models/journal';

export function parseStudents(students: Student[]): any[] {
  return students.map(student => ({
    name: student.firstName,
    lastName: student.lastName,
    address: student.address,
  }));
}

export function parseSubjects(subjects: Subject[]): any[] {
  return subjects.map(subject => ({
    name: subject.name,
    cabinet: subject.cabinet
  }));
}

export function parseJournals(journals: Journal[]): any[] {
  const updatedJournals: any[] = journals.reduce((acc, journal) => {
    const updatedJournal: any[] = journal.studentMarks.map(student => {
      const row: any = {
        'first Name': student.firstName,
        'last name': student.lastName,
      };

      student.marks.forEach((mark, idx) => row[journal.dayNames[idx]] = mark);

      return row;
    });

    return acc.concat(updatedJournal, [{}]);
  }, []);

  return updatedJournals;
}
