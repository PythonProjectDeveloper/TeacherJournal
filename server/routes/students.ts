import { Router } from 'express-serve-static-core';
import { Document } from 'mongoose';
import { Student } from 'database/shemas/person';

export default function routes(router: Router): void {
  router.get('/students', (request, response) => {

      Student.find({}, (err, students) => {
          const data: any = err ? {'error': 'An error has occurred'} : students;

          response.send(data);
      });
  });

  router.get('/students/:id', (request, response) => {

    const id: string = request.params.id;

    Student.findOne({_id: id}, (err, student) => {
      const data: any = err ? {'error': 'An error has occurred'} : student;

      response.send(data);
    });
  });

  router.post('/students', (request, response) => {

    if (!request.body) { return response.sendStatus(400); }

    const student: Document = new Student(request.body);

    student.save((err) => {
      const data: any = err ? {'error': 'An error has occurred'} : student;

      response.send(data);
    });
  });

  router.delete('/students/:id', (request, response) => {

    const id: string = request.params.id;
    Student.findByIdAndDelete(id, (err, student) => {
      const data: any = err ? {'error': 'An error has occurred'} : student;

      response.send(data);
    });
  });

  router.put('/students', (request, response) => {

    if (!request.body) { return response.sendStatus(400); }
    const id: any = request.body.id;

    Student.findOneAndUpdate({_id: id}, request.body, {new: true}, (err, student) => {
      const data: any = err ? {'error': 'An error has occurred'} : student;

      response.send(data);
    });
  });
}
