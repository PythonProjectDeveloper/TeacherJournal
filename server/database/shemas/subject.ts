import mongoose, { Model, Schema } from 'mongoose';
import { TeacherSchema } from './person';
import { TableName } from 'constants/tables';

export const SubjectSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  teacher: TeacherSchema,
  journalId: { type: mongoose.Schema.Types.ObjectId, ref: TableName.Journal },
  cabinet: { type: String },
  description: { type: String },
});

export const Subject: Model<mongoose.Document, {}> = mongoose.model(TableName.Subject, SubjectSchema);
