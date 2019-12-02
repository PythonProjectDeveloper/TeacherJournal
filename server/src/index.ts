import { initServer } from './core';
import { connectToDatabase } from './database';

connectToDatabase()
  .then(() => initServer())
  .catch((reason) => console.log(reason));
