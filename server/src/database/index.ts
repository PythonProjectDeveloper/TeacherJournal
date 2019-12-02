import mongoose from 'mongoose';
import { config } from '../environments';
import { initEvents } from './events';
import { initDatabaseCollections } from './initializer';

const url: string = `mongodb://${config.database.url}:${config.database.port}/${config.database.name}`;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export async function connectToDatabase(): Promise<typeof mongoose> {
  const args: typeof mongoose = await mongoose.connect(url, options);

  initEvents(url);
  initDatabaseCollections();

  return Promise.resolve(args);
}
