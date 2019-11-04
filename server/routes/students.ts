import { Router } from 'express';
import { ObjectID } from 'mongodb';

export default function routes(router: Router, database: any): void {
  router.get('/students/:id', (req, res) => {
    const id: string = req.params.id;
    const details: any = { '_id': new ObjectID(id) };

    database.collection('students').findOne(details, (err, item) => {
      const data: any = err ? {'error': 'An error has occurred'} : item;

      res.send(data);
    });
  });

  router.post('/students', (req, res) => {
      const student: any = req.body;

      database.collection('students').insert(student, (err, result) => {
        const data: any = err ? {'error': 'An error has occurred'} : result.ops[0];

        res.send(data);
      });
    });

  router.delete('/students/:id', (req, res) => {
    const id: string = req.params.id;
    const details: any = { '_id': new ObjectID(id) };

    database.collection('students').remove(details, (err, item) => {
      const data: any = err ? {'error': 'An error has occurred'} : `Note ${ id } deleted!`;

      res.send(data);
    });
  });

  router.put ('/students/:id', (req, res) => {
    const id: string = req.params.id;
    const details: any = { '_id': new ObjectID(id) };
    const student: any = req.body;

    database.collection('students').update(details, student, (err, result) => {
      const data: any = err ? {'error': 'An error has occurred'} : student;

      res.send(data);
    });
  });
}
