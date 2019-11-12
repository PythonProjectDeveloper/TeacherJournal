import mongoose, { Model, Schema, Document } from 'mongoose';
import { TableName } from '../../constants/tables';

export const LogSchema: Schema = new Schema({
  name: { type: String },
  message: { type: String },
  error: { type: Schema.Types.Mixed },
  headers: { type: Schema.Types.Mixed },
});

export const Log: Model<Document, {}> = mongoose.model(TableName.Log, LogSchema);
