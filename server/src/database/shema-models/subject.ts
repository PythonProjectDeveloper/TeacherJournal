import mongoose, { Model } from 'mongoose';
import { ISubjectModel } from '../../entities/subject';
import { TableName } from '../../constants/tables';
import { SubjectSchema } from '../shemas/subject';

export const Subject: Model<ISubjectModel, {}> = mongoose.model<ISubjectModel>(TableName.Subject, SubjectSchema);
