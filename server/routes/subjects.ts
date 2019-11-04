import { Router } from 'express';
import { ObjectID } from 'mongodb';

export default function routes(router: Router, database: any): void {
  router.get('/subjects/:id', (req, res) => {
    const id: string = req.params.id;
    const details: any = { '_id': new ObjectID(id) };

    database.collection('subjects').findOne(details, (err, item) => {
      const data: any = err ? {'error': 'An error has occurred'} : item;

      res.send(data);
    });
  });

  router.post('/subjects', (req, res) => {
      const subject: any = req.body;

      database.collection('subjects').insert(subject, (err, result) => {
        const data: any = err ? {'error': 'An error has occurred'} : result.ops[0];

        res.send(data);
      });
    });

  router.delete('/subjects/:id', (req, res) => {
    const id: string = req.params.id;
    const details: any = { '_id': new ObjectID(id) };

    database.collection('subjects').remove(details, (err, item) => {
      const data: any = err ? {'error': 'An error has occurred'} : `Note ${ id } deleted!`;

      res.send(data);
    });
  });

  router.put ('/subjects/:id', (req, res) => {
    const id: string = req.params.id;
    const details: any = { '_id': new ObjectID(id) };
    const subject: any = req.body;

    database.collection('subjects').update(details, subject, (err, result) => {
      const data: any = err ? {'error': 'An error has occurred'} : subject;

      res.send(data);
    });
  });
}
