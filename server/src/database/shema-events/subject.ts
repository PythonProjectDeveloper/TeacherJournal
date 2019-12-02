import { ISubjectModel } from '../../entities/subject';
import { Student } from '../shema-models/person';
import { Journal, AverageMark } from '../shema-models/journal';
import { Schema } from 'mongoose';

export function initSubjectEvents(shema: Schema): void {
  shema.post<ISubjectModel>('save', async subject => {

    // add new journal
    const students = await Student.find();
    const averageMarks = students.map(student => new AverageMark({ student: student._id}));
    const journal = new Journal({ subject, students, averageMarks });

    journal.save();
  });

  shema.post<ISubjectModel>('findOneAndDelete', async doc => {
    // remove journal
    await Journal.findOneAndDelete({ subject: doc._id });
  });
}
