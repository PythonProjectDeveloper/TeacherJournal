import { MongoClient } from 'mongodb';

export function initProcessListeners(database: MongoClient): void {
  process.on('SIGINT', () => {
    database.close();
    process.exit();
  });
}
