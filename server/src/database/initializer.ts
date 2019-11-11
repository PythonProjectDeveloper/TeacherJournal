import mockData from '../../mock.server.data.json';
import { config } from '../environments';
import { Model, Document } from 'mongoose';
import { Subject } from './shemas/subject';
import { Student, Teacher } from './shemas/person';
import { Journal } from './shemas/journals';

export function initDatabaseCollections(): void {
  if (config.production) { return; }

  // initDatabaseCollection(Teacher, mockData.teachers);
  // initDatabaseCollection(Student, mockData.students);
  // initDatabaseCollection(Subject, mockData.subjects);
  // initDatabaseCollection(Journal, mockData.journals);
}

export function initDatabaseCollection(model: Model<Document, {}>, data: any[]): void {
  model.collection.countDocuments({}, {}, (err, count) => {
      if (err) { return; }
      if (count === 0) { model.collection.insertMany(data); }
  });
}
