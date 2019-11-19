import { Router } from 'express';
import { Student } from '../database/shema-models/person';
import { Subject } from '../database/shema-models/subject';
import { Journal } from '../database/shema-models/journal';

export default function routes(router: Router): void {
  router.get('/export/students', (request, response) => {

    Student
      .find()
      .select('firstName lastName address -_id')
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.get('/export/subjects', (request, response) => {

    Subject
      .find()
      .select('name cabinet -_id')
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.get('/export/journals', (request, response) => {

    Journal
      .find()
      .populate('subject students')
      .select('-_id')
      .then(journals => {
        const updatedJournals = journals.reduce((acc, journal) => {

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
