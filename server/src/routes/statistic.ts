import { Router } from 'express';
import { isNull } from 'util';
import { mean } from 'lodash';
import { Journal } from '../database/shema-models/journal';
import { IMarkModel } from '../entities/journals';

export default function routes(router: Router): void {
  router.get('/graph/student/:id', (request, response) => {
    // kind of data = [{ group: 'subject name', value: 'mark average' }];
    Journal.find()
      .populate('subject')
      .then(journals => {

        const metrics = journals.reduce((graphData, journal) => {
          const marks: number[] = journal.days.reduce((subjectMarks, day) => {
            const mark = (day.marks as IMarkModel[]).find(dayMark => dayMark.student.toString() === request.params.id);

            if (mark && !isNull(mark.value)) { subjectMarks.push(mark.value); }

            return subjectMarks;
          }, [] as number[]);

          graphData.push({ group: journal.subject.name, value: mean(marks) });

          return graphData;
        }, [] as any[]);

        response.send(metrics);
      })
      .catch(err => response.send(err));
  });

  router.get('/graph/subject/:id', (request, response) => {

    Journal.findOne({ subject: request.params.id})
      .then((journal: any) => {

        // kind of data = { [key: mark value]: quantity }
        const metrics = journal.days.reduce((graphData, day) => {

          day.marks.forEach(mark => {
            if (!mark.value) { return; }

            (mark.value in graphData) ? graphData[mark.value] += 1 : graphData[mark.value] = 1;
          });
          return graphData;
        }, {});

        response.send(metrics);
      })
      .catch(err => response.send(err));
  });
}
