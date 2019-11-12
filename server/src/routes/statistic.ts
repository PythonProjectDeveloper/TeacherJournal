import { Router } from 'express';
import { Journal } from '../database/shemas/journals';

export default function routes(router: Router): void {
  router.get('/graph/student/:id', (request, response) => {
    // kind of data = [{ group: 'subject name', value: 'mark average' }];
    Journal.find()
      .populate('subject')
      .then(journals => {

        const metrics: any[] = journals.reduce((graphData, journal: any) => {
          const marks: number[] = journal.days.reduce((marks, day) => {
            day.marks.findOne({ student: request.params.id })
              .then(mark => {
                if (mark) { marks.push(mark); }
              });

            return marks;
          }, []);

          const sum: number = marks.reduce((acc, mark) => acc + sum, 0);
          const average: number = sum / marks.length;

          graphData.push({ group: journal.subject.name, value: average });

          return graphData;
        }, [] as any[]);


        response.send(metrics);
      })
      .catch(err => response.send(err));
  });

  router.get('/graph/subject/:id', (request, response) => {

    Journal.findOne({ subject: request.params.id})
      .then((journal: any) => {

        // kind of data = { a: 9, b: 20, c: 30, d: 8, e: 12, f: 3, g: 7, h: 14 }
        const metrics: any = journal.days.reduce((graphData, day) => {
          day.marks.forEach(mark => {
            if (!mark.value) { return; }

            (mark in graphData) ? graphData[mark.value] += 1 : graphData[mark.value] = 1;
          });
          return graphData;
        }, {});

        response.send(metrics);
      })
      .catch(err => response.send(err));
  });
}
