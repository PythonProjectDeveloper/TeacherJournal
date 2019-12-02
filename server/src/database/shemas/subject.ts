import { Schema } from 'mongoose';
import { TableName } from '../../constants/tables';
import { ISubjectModel } from '../../entities/subject';
import { initSubjectEvents } from '../shema-events/subject';

export const SubjectSchema: Schema<ISubjectModel> = new Schema({
  name: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: TableName.Teacher },
  cabinet: { type: String },
  description: { type: String },
}, { versionKey: false });

initSubjectEvents(SubjectSchema);
