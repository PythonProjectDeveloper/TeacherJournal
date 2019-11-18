import mongoose, { Model } from 'mongoose';
import { ILogModel } from '../../entities/log';
import { TableName } from '../../constants/tables';
import { LogSchema } from '../shemas/log';

export const Log: Model<ILogModel, {}> = mongoose.model<ILogModel>(TableName.Log, LogSchema);
