import mongoose, { Model, Schema } from 'mongoose';
import { TableName } from '../../constants/tables';
import { ILogModel } from '../../entities/log';

export const LogSchema: Schema = new Schema({
  name: { type: String },
  message: { type: String },
  error: { type: Schema.Types.Mixed },
  headers: { type: Schema.Types.Mixed },
});

export const Log: Model<ILogModel, {}> = mongoose.model<ILogModel>(TableName.Log, LogSchema);
