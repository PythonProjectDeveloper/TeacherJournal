import { ISubjectModel } from './subject';
import { IStudentModel } from './person';
import { Document } from 'mongoose';

export interface IAverageMark {
  student: string & IStudentModel;
  value: number;
  markQuantity: number;
}

export interface IMark {
  student: string & IStudentModel;
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
  averageMarks: IAverageMark[];
}

export interface IAverageMarkModel extends IAverageMark, Document { }
export interface IMarkModel extends IMark, Document { }
export interface IDayModel extends IDay, Document { }
export interface IJournalModel extends IJournal, Document { }
