import { Router } from 'express-serve-static-core';
import { Document } from 'mongoose';
import { Student } from '../database/shemas/person';
import { isString } from 'util';
import { Journal } from '../database/shemas/journals';
import { Subject } from '../database/shemas/subject';
import { find } from 'lodash';

export default function routes(router: Router): void {
  router.get('/students', async (request, response) => {
    const filterData = JSON.parse(request.query.filter);
//     [ { name: 's', type: 'stringFilter' }, {dates: { condition: '<', date: '1996'}, type: 'dateFilter' } ]
// {
//   field: 'name/date',
//   condition: '',

// }
// return filterData.filter(filter => allFilters[filter.type](data, filter.options))
    // selection for student page
    if (isString(filterData) || !filterData.length) {
      const regex = new RegExp( filterData, 'i');
      const params = { $regex: regex };

      Student
        .find()
        .or([
          { firstName: params },
          { lastName: params },
          { address: params },
          { description: params }
        ])
        .exec()
        .then(data => response.send(data))
        .catch(err => response.send(err));

    // selection for statistic page
    } else {
      const intersection: { [key: string]: number} = {};
      let dayNumber = 0;
      const subjects = await Subject
        .find()
        .where('name').in(filterData.map(data => data.subject))
        .select('_id name');

      const journals = await Journal
        .find()
        .where('subject').in(subjects)
        .populate('subject');

      journals.forEach((journal: any) => {

        const filterDates = find(filterData, { subject: journal.subject.name }).dates;
        journal.days.forEach(day => {

          if (!filterDates.includes(day.name)) { return ; }
          dayNumber += 1;
          day.marks.forEach(mark => {
            if (!intersection.hasOwnProperty(mark.student)) {
              intersection[mark.student] = 0;
            }

            intersection[mark.student] += mark.value ? 1 : 0;
          });
        });
      });

      const studentIds: string[] = [];
      for (const key of Object.keys(intersection)) {
        if (intersection[key] === dayNumber) {
          studentIds.push(key);
        }
      }

      Student
        .find()
        .where('_id').in(studentIds)
        .exec()
        .then(data => response.send(data))
        .catch(err => response.send(err));
    }
  });

  router.get('/students/:id', (request, response) => {

    Student.findById(request.params.id)
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.post('/students', (request, response) => {
    delete request.body._id;
    const student: Document = new Student(request.body);

    student.save()
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.delete('/students/:id', (request, response) => {

    Student.findByIdAndDelete(request.params.id)
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.put('/students/:id', (request, response) => {
    Student.findByIdAndUpdate(request.params.id, request.body, {new: true})
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });
}
