import { Schema } from 'mongoose';
import { TableName } from '../../constants/tables';
import { IJournalModel, IDayModel, IMarkModel, IAverageMarkModel } from '../../entities/journals';

export const AverageMarkSchema: Schema<IAverageMarkModel> = new Schema({
  student: { type: Schema.Types.ObjectId, ref: TableName.Student },
  value: { type: Number, default: 0 },
  markQuantity: { type: Number, default: 0 },
}, { versionKey: false });

export const MarkSchema: Schema<IMarkModel> = new Schema({
  student: { type: Schema.Types.ObjectId, ref: TableName.Student },
  value: { type: Number, default: null },
}, { versionKey: false });

export const DaySchema: Schema<IDayModel> = new Schema({
  name: { type: String, required: true },
  marks: [MarkSchema],
}, { versionKey: false });

export const JournalSchema: Schema<IJournalModel> = new Schema({
  subject: { type: Schema.Types.ObjectId, ref: TableName.Subject },
  students: [{ type: Schema.Types.ObjectId, ref: TableName.Student }],
  days: [DaySchema],
  averageMarks: [AverageMarkSchema],
}, { versionKey: false });
