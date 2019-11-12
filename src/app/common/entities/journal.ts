import { ISubject } from './subject';
import { IStudent } from './person';

export interface IJournal {
  _id: string;
  subject: ISubject;
  students: IStudent[];
  days: IDay[];
}

export interface IDay {
  name: string;
  marks: IMark[];
}

export interface IMark {
  student: string;
  value: number | null;
}
