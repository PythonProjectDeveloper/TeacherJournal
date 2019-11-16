import { Router } from 'express';
import { Journal } from '../database/shemas/journals';

export default function routes(router: Router): void {
  // [{
  //   "subjectName": "physics",
  //   "dates": [
  //     { "name": "04/02", "state": false },
  //     { "name": "05/02", "state": false },
  //     { "name": "06/02", "state": false },
  //     { "name": "07/02", "state": false }
  //   ]
  // }]
  router.get('/widget/journals', (request, response) => {

  Journal.find()
    .populate('subject')
    .then(journals => {
      const data = journals.map(journal => ({
        subjectName: journal.subject.name,
        dates: journal.days.map(day => ({ name: day.name, state: false }))
      }));

      response.send(data);
    })
    .catch(err => response.send(err));
  });
}
