import { Document } from 'mongoose';

export interface ILog {
  name: string;
  message: string;
  error: any;
  headers: any;
}

export interface ILogModel extends ILog, Document { }
