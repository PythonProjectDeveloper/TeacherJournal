import { Schema } from 'mongoose';
import { ILogModel } from '../../entities/log';

export const LogSchema: Schema<ILogModel> = new Schema({
  name: { type: String },
  message: { type: String },
  error: { type: Schema.Types.Mixed },
  headers: { type: Schema.Types.Mixed },
});
