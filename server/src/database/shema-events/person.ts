
import { IPersonModel } from '../../entities/person';
import { Journal, Mark, AverageMark } from '../shema-models/journal';
import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';

export function initPersonEvents(shema: Schema): void {
  shema.post<IPersonModel>('save', async person => {
    const journals = await Journal.find();

    // add new marks to all journals
    journals.forEach(journal => {
      journal.students.push(person);

      journal.days.forEach(day => {
        day.marks.push(new Mark({ student: person._id }));
      });

      journal.averageMarks.push(new AverageMark({ student: person._id }));

      journal.save();
    });
  });

  shema.post<IPersonModel>('findOneAndDelete', async person => {
    const journals = await Journal.find();

    journals.forEach((journal: any) => {

      journal.days.forEach(day => {
        day.marks = day.marks.filter(mark => !new ObjectId(mark.student).equals(new ObjectId(person._id)));
      });

      journal.averageMarks = journal.averageMarks.filter(mark => !new ObjectId(mark.student).equals(new ObjectId(person._id)));

      journal.save();
    });

    await Mark.deleteMany({ student: person._id });
    await AverageMark.deleteMany({ student: person._id });
  });
}
