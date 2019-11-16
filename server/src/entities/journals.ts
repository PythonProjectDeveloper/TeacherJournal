import { ISubjectModel } from './subject';
import { IStudentModel } from './person';
import { Document } from 'mongoose';

export interface IMark {
  student: string & ISubjectModel;
  value: number | null;
}

export interface IDay {
  name: string;
  marks: string[] & IMarkModel[];
}

export interface IJournal {
  subject: string & ISubjectModel;
  students: string[] & IStudentModel[];
  days: IDayModel[];
}

export interface IMarkModel extends IMark, Document { }
export interface IDayModel extends IDay, Document { }
export interface IJournalModel extends IJournal, Document { }
