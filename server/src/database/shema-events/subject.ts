import { SubjectSchema } from '../shemas/subject';
import { Journal } from '../shemas/journals';
import { Student } from '../shemas/person';
import { ISubjectModel } from '../../entities/subject';

export function initSubjectEvents(): void {
  SubjectSchema.post<ISubjectModel>('save', async subject => {

    // add new journal
    const students = await Student.find();
    const journal = new Journal({ subject, students });

    journal.save();
  });

  SubjectSchema.post<ISubjectModel>('remove', doc => {
    // remove journal
    Journal.findOneAndRemove( { studentID: doc._id });
  });
}
