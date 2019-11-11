import mongoose from 'mongoose';
import { config } from '../environments';
import { initEvents } from './events';
import { initDatabaseCollections } from './initializer';
import { initSchemaEvents } from './shema-events';

const url: string = `mongodb://${config.database.url}:${config.database.port}/${config.database.name}`;
console.log(url)

export async function connectToDatabase(): Promise<typeof mongoose> {
  const args: typeof mongoose = await mongoose.connect(url, { useNewUrlParser: true });

  initEvents(url);
  initSchemaEvents();
  initDatabaseCollections();

  return Promise.resolve(args);
}
