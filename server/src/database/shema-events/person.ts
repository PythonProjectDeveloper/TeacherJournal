
import { IPersonModel } from '../../entities/person';
import { Journal, Mark } from '../shema-models/journal';
import { Schema } from 'mongoose';
import { filter } from 'lodash';

export function initPersonEvents(shema: Schema): void {
  shema.post<IPersonModel>('save', async person => {
    const journals = await Journal.find();

    // add new marks to all journals
    journals.forEach(journal => {
      journal.students.push(person);

      journal.days.forEach(day => {
        day.marks.push(new Mark({ student: person._id }));
      });

      journal.save();
    });
  });

  shema.post<IPersonModel>('findOneAndDelete', async person => {
    const journals = await Journal.find();

    journals.forEach((journal: any) => {

      journal.days.forEach(day => {
        console.log(day.marks.map(mark => mark.student), person._id)
        console.log(day.marks.filter(mark => mark.student === person._id))
        
        // day.marks = filter(day.marks, mark => mark.student !== person._id);
      });

      // journal.save();
    });

    await Mark.deleteMany({ student: person._id });

  });
}
