import { MongoClient } from 'mongodb';
import { config } from './environments';
import { initServer } from 'core';
import { initDatabaseCollections } from 'database/initializer';
import { initProcessListeners } from 'core/process-listeners';

MongoClient.connect(`mongodb://${config.database.url}:${config.database.port}/${config.database.name}`, (err, db) => {
  if (err) { return console.log(err); }

  initDatabaseCollections(db);
  initServer(db);
  initProcessListeners(db);
});
