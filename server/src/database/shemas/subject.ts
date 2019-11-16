import mongoose, { Model, Schema } from 'mongoose';
import { TableName } from '../../constants/tables';
import { ISubjectModel } from '../../entities/subject';

export const SubjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: TableName.Teacher },
  cabinet: { type: String },
  description: { type: String },
}, { versionKey: false });

export const Subject: Model<ISubjectModel, {}> = mongoose.model<ISubjectModel>(TableName.Subject, SubjectSchema);
