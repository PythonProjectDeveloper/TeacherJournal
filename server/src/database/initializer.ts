import mockData from '../../mock.server.data.json';
import { config } from '../environments';
import mongoose, { Model, Document } from 'mongoose';
import { Subject } from './shemas/subject';
import { Student, Teacher } from './shemas/person';
import { Journal } from './shemas/journals';
import { error } from '../constants/term-color';
import { getRandomMark } from '../helpers/calculation';

const INITIALIZATION_ERROR_MESSAGE = 'error of database initialization';

export async function initDatabaseCollections(): Promise<void> {
  if (config.production) { return; }

  await mongoose.connection.db.dropDatabase();

  await initDatabaseCollection(Teacher, mockData.teachers);
  await initDatabaseCollection(Student, mockData.students);
  await initSubjectDatabaseCollection(Subject, mockData.subjects);
  await initJournalDatabaseCollection(Journal, mockData.journals);
}

export async function initDatabaseCollection(model: Model<Document, {}>, data: any[]): Promise<void> {
  await model.collection
    .insertMany(data)
    .catch(() => error(INITIALIZATION_ERROR_MESSAGE));
}

export async function initSubjectDatabaseCollection(model: Model<Document, {}>, subjects: any[]): Promise<void> {
  const teachers = await Teacher.find().select('_id');
  const data = subjects.map((subject, idx) => ({...subject, teacher: teachers[idx]._id}));

  initDatabaseCollection(model, data);
}

export async function initJournalDatabaseCollection(model: Model<Document, {}>, journals: any[]): Promise<void> {
  const subjects = await Subject.find().select('_id');
  const students = await Student.find().select('_id');

  const data = journals.map((journal, idx) => ({
    subject: subjects[idx]._id,
    students: students.map(doc => doc._id),
    days: journal.days.map(day => ({
      name: day.name,
      marks: students.map(student => ({
        student: student._id,
        value: getRandomMark(0, 11),
      }))
    }))
  }));

  initDatabaseCollection(model, data);
}
