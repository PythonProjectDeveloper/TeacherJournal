import { Document } from 'mongoose';
import { SubjectSchema } from '../shemas/subject';
import { Journal } from '../shemas/journals';
import { Student } from '../shemas/person';

export function initSubjectEvents(): void {
  SubjectSchema.post('save', async subject => {
    // add new journal
    const students: Document[] = await Student.find();
    const journal: Document = new Journal({ subject, students });

    journal.save();
  });

  SubjectSchema.post('remove', doc => {
    // remove journal
    Journal.findOneAndRemove( { studentID: doc._id });
  });
}
