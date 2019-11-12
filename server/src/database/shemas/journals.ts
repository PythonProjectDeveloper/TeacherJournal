import mongoose, { Schema, Model, Document } from 'mongoose';
import { SubjectSchema } from './subject';
import { StudentSchema } from './person';
import { TableName } from '../../constants/tables';

export const MarkSchema: Schema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: TableName.Student },
  value: { type: Number, default: null },
});

export const DaySchema: Schema = new Schema({
  name: { type: String, required: true },
  marks: [MarkSchema],
});

export const JournalSchema: Schema = new Schema({
  subject: { type: Schema.Types.ObjectId, ref: TableName.Subject },
  students: [{ type: Schema.Types.ObjectId, ref: TableName.Student }],
  days: [DaySchema],
});

export const Journal: Model<Document, {}> = mongoose.model(TableName.Journal, JournalSchema);
export const Day: Model<Document, {}> = mongoose.model(TableName.Day, DaySchema);
export const Mark: Model<Document, {}> = mongoose.model(TableName.Mark, MarkSchema);
