import mongoose, { Schema, Model } from 'mongoose';
import { SubjectSchema } from './subject';
import { TableName } from 'constants/tables';

export const MarkSchema: Schema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: TableName.Subject },
  value: { type: Number, default: null },
});

export const DateSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  marks: [MarkSchema],
});

export const JournalSchema: Schema = new mongoose.Schema({
  subject: SubjectSchema,
  days: [DateSchema],
});

export const Journal: Model<mongoose.Document, {}> = mongoose.model(TableName.Journal, JournalSchema);
export const Date: Model<mongoose.Document, {}> = mongoose.model(TableName.Date, DateSchema);
export const Mark: Model<mongoose.Document, {}> = mongoose.model(TableName.Mark, MarkSchema);
