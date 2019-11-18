import mongoose, { Model } from 'mongoose';
import { IJournalModel, IDayModel, IMarkModel } from '../../entities/journals';
import { TableName } from '../../constants/tables';
import { JournalSchema, DaySchema, MarkSchema } from '../shemas/journals';

export const Journal: Model<IJournalModel, {}> = mongoose.model<IJournalModel>(TableName.Journal, JournalSchema);
export const Day: Model<IDayModel, {}> = mongoose.model<IDayModel>(TableName.Day, DaySchema);
export const Mark: Model<IMarkModel, {}> = mongoose.model<IMarkModel>(TableName.Mark, MarkSchema);
