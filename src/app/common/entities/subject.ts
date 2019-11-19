export interface ISubjectState {
  _id: string;
  name: string;
  teacher: string;
  cabinet: string;
  description: string;
}

export const SUBJECT_STATE: ISubjectState = {
  _id: '',
  name: '',
  teacher: '',
  cabinet: '',
  description: ''
};
