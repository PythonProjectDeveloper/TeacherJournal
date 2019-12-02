import mongoose, { Model } from 'mongoose';
import { IPersonModel, IStudentModel, ITeacherModel } from '../../entities/person';
import { TableName } from '../../constants/tables';
import { PersonSchema, StudentSchema, TeacherSchema } from '../shemas/person';

export const Person: Model<IPersonModel, {}> = mongoose.model<IPersonModel>(TableName.Person, PersonSchema);
export const Student: Model<IStudentModel, {}> = mongoose.model<IStudentModel>(TableName.Student, StudentSchema);
export const Teacher: Model<ITeacherModel, {}> = mongoose.model<ITeacherModel>(TableName.Teacher, TeacherSchema);
