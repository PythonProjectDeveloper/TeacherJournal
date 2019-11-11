import { Router } from 'express';
import { Student } from '../database/shemas/person';
import { Journal } from '../database/shemas/journals';
import { Subject } from '../database/shemas/subject';

export default function routes(router: Router): void {
  router.get('/export/students', (request, response) => {

    Student.find()
      .select('firstName lastName address')
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.get('/export/subjects', (request, response) => {

    Subject.find()
      .select('name cabinet')
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.get('/export/journals', (request, response) => {

    Journal.find()
      .then(journals => {
        const updatedJournals: any[] = journals.reduce((acc, journal: any) => {
          acc.push({ subject: journal.subject.name });

          for (const key of Object.keys(journal.students)) {
            const row: any = {
              'first Name': journal.students[key].firstName,
              'last name': journal.students[key].lastName,
            };

            journal.days.forEach(day => row[day.name] = day.marks[key]);

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
