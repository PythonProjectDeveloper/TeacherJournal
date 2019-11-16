import mongoose, { Model, Schema } from 'mongoose';
import extendSchema from 'mongoose-extend-schema';
import { TableName } from '../../constants/tables';
import { IPersonModel, IStudentModel, ITeacherModel } from '../../entities/person';

export const PersonSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String },
  description: { type: String },
}, { versionKey: false } );

export const StudentSchema: Schema = extendSchema(PersonSchema, {});
export const TeacherSchema: Schema = extendSchema(PersonSchema, {});

export const Person: Model<IPersonModel, {}> = mongoose.model<IPersonModel>(TableName.Person, PersonSchema);
export const Student: Model<IStudentModel, {}> = mongoose.model<IStudentModel>(TableName.Student, StudentSchema);
export const Teacher: Model<ITeacherModel, {}> = mongoose.model<ITeacherModel>(TableName.Teacher, TeacherSchema);
