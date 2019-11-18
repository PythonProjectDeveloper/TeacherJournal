import { Schema } from 'mongoose';
import extendSchema from 'mongoose-extend-schema';
import { IPersonModel, IStudentModel, ITeacherModel } from '../../entities/person';
import { initPersonEvents } from '../shema-events/person';

export const PersonSchema: Schema<IPersonModel> = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String },
  description: { type: String },
}, { versionKey: false } );

export const StudentSchema: Schema<IStudentModel> = extendSchema(PersonSchema, {}, { versionKey: false });
export const TeacherSchema: Schema<ITeacherModel> = extendSchema(PersonSchema, {}, { versionKey: false });

initPersonEvents(StudentSchema);
