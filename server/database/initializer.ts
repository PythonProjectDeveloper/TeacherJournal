import { SUBJECTS, STUDENTS, TEACHERS } from 'constants/collections';
import mockData from 'mock.server.data.json';
import { config } from 'environments';

export function initDatabaseCollections(database: any): void {
  if (!config.production) { return; }

  initDatabaseCollection(database, TEACHERS, mockData.teachers);
  initDatabaseCollection(database, STUDENTS, mockData.students);
  initDatabaseCollection(database, SUBJECTS, mockData.subjects);
}

export function initDatabaseCollection(database: any, collectionName: string, data: any[]): any {
  const collection: any = database.collection(collectionName);

  collection.countDocuments({}, {}, (err, count) => {
      if (err) { return; }
      if (count === 0) { collection.insertMany(data); }
  });

  return collection;
}
