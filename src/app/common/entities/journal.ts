import { ISubjectState, SUBJECT_STATE } from './subject';
import { IStudentState } from './person';

export interface IJournalState {
  _id: string;
  subject: ISubjectState;
  students: IStudentState[];
  days: IDayState[];
  averageMarks: IAverageMarkState[];
}

export const JOURNAL_STATE: IJournalState = {
  _id: '',
  subject: SUBJECT_STATE,
  students: [],
  days: [],
  averageMarks: [],
};

export interface IDayState {
  _id: string;
  name: string;
  marks: IMarkState[];
}

export const DAY_STATE: IDayState = {
  _id: '',
  name: '',
  marks: [],
};

export interface IMarkState {
  _id: string;
  student: string;
  value: number | null;
}

export const MARK_STATE: IMarkState = {
  _id: '',
  student: '',
  value: null,
};

export interface IAverageMarkState {
  _id: string;
  student: string;
  value: number;
  markQuantity: number;
}

export const AVERAGE_MARK_STATE: IAverageMarkState = {
  _id: '',
  student: '',
  value: 0,
  markQuantity: 0,
};
