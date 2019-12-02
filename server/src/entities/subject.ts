import { ITeacherModel } from './person';
import { Document } from 'mongoose';

export interface ISubject {
  name: string;
  teacher: string & ITeacherModel;
  cabinet: string;
  description: string;
}

export interface ISubjectModel extends ISubject, Document { }
