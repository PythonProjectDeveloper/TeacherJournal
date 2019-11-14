import { ISubject, SUBJECT } from './subject';
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

export const JOURNAL: IJournal = {
  _id: '',
  subject: SUBJECT,
  students: [],
  days: []
};

export const DAY: IDay = {
  name: '',
  marks: []
};

export const MARK: IMark = {
  student: '',
  value: null
};
