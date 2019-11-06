import { Router } from 'express';
import { Journal } from 'database/shemas/journals';

export default function routes(router: Router): void {
  router.get('/journals', (request, response) => {

    Journal.find((err, journals) => {
        const data: any = err ? {'error': 'An error has occurred'} : journals;

        response.send(data);
    });
});

  router.get('/journals/:id', (request, response) => {

    Journal.findOne({ 'subject._id': request.params.id}, (err, journal) => {
      const data: any = err ? {'error': 'An error has occurred'} : journal;

      response.send(data);
    });
  });

  router.put('/journals', (request, response) => {

    if (!request.body) { return response.sendStatus(400); }

    Journal.findByIdAndUpdate(request.params.id, request.body, {new: true}, (err, journal) => {
      const data: any = err ? {'error': 'An error has occurred'} : journal;

      response.send(data);
    });
  });
}
