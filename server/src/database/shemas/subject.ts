import mongoose, { Model, Schema, Document } from 'mongoose';
import { TableName } from '../../constants/tables';

export const SubjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: TableName.Teacher },
  cabinet: { type: String },
  description: { type: String },
});

export const Subject: Model<Document, {}> = mongoose.model(TableName.Subject, SubjectSchema);
