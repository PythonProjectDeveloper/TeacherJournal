import { PersonSchema } from 'database/shemas/person';
import { Mark, Journal } from 'database/shemas/journals';
import { Document } from 'mongoose';

export function initPersonEvents(): void {
  PersonSchema.post('save', async person => {
    const journals: Document[] = await Journal.find();

    // add new marks to all journals
    journals.forEach((journal: any) => {
      journal.students.push(person);

      journal.days.forEach((day: any) => {
        day.marks.push(new Mark({ studentID: person._id }));

        day.save();
      });
    });
  });

  PersonSchema.post('remove', async person => {
    const journals: Document[] = await Journal.find();

    // remove marks from all journals
    journals.forEach((journal: any) => {
      journal.students.id(person._id).remove();

      journal.days.forEach((day: any) => {
        day.marks.findOneAndRemove({ studentID: person._id });

        day.save();
      });
    });
  });
}
