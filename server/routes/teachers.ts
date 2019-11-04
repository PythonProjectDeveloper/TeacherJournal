import { Router } from 'express';
import { ObjectID } from 'mongodb';

export default function routes(router: Router, database: any): void {
  router.get('/teachers/:id', (req, res) => {
    const id: string = req.params.id;
    const details: any = { '_id': new ObjectID(id) };

    database.collection('teachers').findOne(details, (err, item) => {
      const data: any = err ? {'error': 'An error has occurred'} : item;

      res.send(data);
    });
  });

  router.post('/teachers', (req, res) => {
      const teacher: any = req.body;

      database.collection('teachers').insert(teacher, (err, result) => {
        const data: any = err ? {'error': 'An error has occurred'} : result.ops[0];

        res.send(data);
      });
    });

  router.delete('/teachers/:id', (req, res) => {
    const id: string = req.params.id;
    const details: any = { '_id': new ObjectID(id) };

    database.collection('teachers').remove(details, (err, item) => {
      const data: any = err ? {'error': 'An error has occurred'} : `Note ${ id } deleted!`;

      res.send(data);
    });
  });

  router.put ('/teachers/:id', (req, res) => {
    const id: string = req.params.id;
    const details: any = { '_id': new ObjectID(id) };
    const teacher: any = req.body;

    database.collection('teachers').update(details, teacher, (err, result) => {
      const data: any = err ? {'error': 'An error has occurred'} : teacher;

      res.send(data);
    });
  });
}
