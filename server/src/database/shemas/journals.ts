import mongoose, { Schema, Model } from 'mongoose';
import { TableName } from '../../constants/tables';
import { IJournalModel, IDayModel, IMarkModel } from '../../entities/journals';

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

export const Journal: Model<IJournalModel, {}> = mongoose.model<IJournalModel>(TableName.Journal, JournalSchema);
export const Day: Model<IDayModel, {}> = mongoose.model<IDayModel>(TableName.Day, DaySchema);
export const Mark: Model<IMarkModel, {}> = mongoose.model<IMarkModel>(TableName.Mark, MarkSchema);
