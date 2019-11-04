import { IEnvironment } from 'entities/environment';

export const environment: IEnvironment = {
  production: false,
  port: 3000,
  database: {
    url: 'localhost',
    name: 'teacher-journal',
    port: 0
  }
};
