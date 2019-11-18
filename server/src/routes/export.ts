import { Router } from 'express';
import { findWithoutId } from '../helpers/queries';
import { Student } from '../database/shema-models/person';
import { Subject } from '../database/shema-models/subject';
import { Journal } from '../database/shema-models/journal';

export default function routes(router: Router): void {
  router.get('/export/students', (request, response) => {

    findWithoutId(Student)
      .select('firstName lastName address')
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.get('/export/subjects', (request, response) => {

    findWithoutId(Subject)
      .select('name cabinet')
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.get('/export/journals', (request, response) => {

    findWithoutId(Journal)
      .populate('subject students')
      .then(journals => {
        const updatedJournals: any[] = journals.reduce((acc, journal: any) => {
          // acc.push({ subject: journal.subject.name });

          for (const key of Object.keys(journal.students)) {
            const row: any = {
              'first Name': journal.students[key].firstName,
              'last name': journal.students[key].lastName,
            };

            journal.days.forEach(day => row[day.name] = day.marks[key].value);

            acc.push(row);
          }

          acc.push({});

          return acc;
        }, [] as any[]);

        response.send(updatedJournals);
      })
      .catch(err => response.send(err));

  });
}
