
import { PersonSchema } from '../shemas/person';
import { Journal, Mark } from '../shemas/journals';
import { IPersonModel } from '../../entities/person';

export function initPersonEvents(): void {
  PersonSchema.post<IPersonModel>('save', async person => {
    const journals = await Journal.find();

    // add new marks to all journals
    journals.forEach(journal => {
      journal.students.push(person);

      journal.days.forEach(day => {
        day.marks.push(new Mark({ studentID: person._id }));

        day.save();
      });
    });
  });

  PersonSchema.post<IPersonModel>('remove', async person => {
    const journals = await Journal.find();

    // remove marks from all journals
    journals.forEach((journal: any) => {
      journal.students.id(person._id).remove();

      journal.days.forEach(day => {
        day.marks.findOneAndRemove({ studentID: person._id });

        day.save();
      });
    });
  });
}
