import mongoose, { Model, Schema, Document } from 'mongoose';
import extendSchema from 'mongoose-extend-schema';
import { TableName } from 'constants/tables';

export const PersonSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String },
  description: { type: String },
});

export const StudentSchema: Schema = extendSchema(PersonSchema, {});
export const TeacherSchema: Schema = extendSchema(PersonSchema, {});

export const Person: Model<Document, {}> = mongoose.model(TableName.Person, PersonSchema);
export const Student: Model<Document, {}> = mongoose.model(TableName.Student, StudentSchema);
export const Teacher: Model<Document, {}> = mongoose.model(TableName.Teacher, TeacherSchema);
