import { Router } from 'express-serve-static-core';
import { Document } from 'mongoose';
import { Subject } from 'database/shemas/subject';

export default function routes(router: Router): void {
  router.get('/subjects', (request, response) => {

      Subject.find({}, (err, subjects) => {
          const data: any = err ? {'error': 'An error has occurred'} : subjects;

          response.send(data);
      });
  });

  router.get('/subjects/:id', (request, response) => {

    const id: string = request.params.id;

    Subject.findOne({_id: id}, (err, subject) => {
      const data: any = err ? {'error': 'An error has occurred'} : subject;

      response.send(data);
    });
  });

  router.post('/subjects', (request, response) => {

    if (!request.body) { return response.sendStatus(400); }

    const subject: Document = new Subject(request.body);

    subject.save((err) => {
      const data: any = err ? {'error': 'An error has occurred'} : subject;

      response.send(data);
    });
  });

  router.delete('/subjects/:id', (request, response) => {

    const id: string = request.params.id;
    Subject.findByIdAndDelete(id, (err, subject) => {
      const data: any = err ? {'error': 'An error has occurred'} : subject;

      response.send(data);
    });
  });

  router.put('/subjects', (request, response) => {

    if (!request.body) { return response.sendStatus(400); }
    const id: any = request.body.id;

    Subject.findOneAndUpdate({_id: id}, request.body, {new: true}, (err, subject) => {
      const data: any = err ? {'error': 'An error has occurred'} : subject;

      response.send(data);
    });
  });
}
