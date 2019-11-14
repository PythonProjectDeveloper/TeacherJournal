import { ISubject, SUBJECT } from './subject';
import { IStudent } from './person';

export interface IJournal {
  _id: string;
  subject: ISubject;
  students: IStudent[];
  days: IDay[];
}

export interface IDay {
  _id: string;
  name: string;
  marks: IMark[];
}

export interface IMark {
  _id: string;
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
  _id: '',
  name: '',
  marks: []
};

export const MARK: IMark = {
  _id: '',
  student: '',
  value: null
};
