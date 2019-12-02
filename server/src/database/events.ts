import mongoose from 'mongoose';
import { connected, error, disconnected, termination } from '../constants/term-color';

export function initEvents(url: string): void {
  mongoose.connection.on('connected', () => {
    console.log(connected('Mongoose default connection is open to ', url));
  });

  mongoose.connection.on('error', (err) => {
    console.log(error('Mongoose default connection has occured ' + err + ' error'));
  });

  mongoose.connection.on('disconnected', () => {
    console.log(disconnected('Mongoose default connection is disconnected'));
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log(termination('Mongoose default connection is disconnected due to application termination'));
        process.exit(0);
    });
  });
}
