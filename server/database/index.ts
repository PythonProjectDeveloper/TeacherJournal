import mongoose from 'mongoose';
import { config } from 'environments';
import { initEvents } from './events';
import { initDatabaseCollections } from './initializer';

const url: string = `mongodb://${config.database.url}:${config.database.port}/${config.database.name}`;

export async function connectToDatabase(): Promise<typeof mongoose> {
  const args: typeof mongoose = await mongoose.connect(url, { useNewUrlParser: true });

  initEvents(url);
  initDatabaseCollections();

  return Promise.resolve(args);
}
