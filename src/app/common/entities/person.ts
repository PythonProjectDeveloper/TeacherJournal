export interface IPersonState {
  _id: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;
}

export interface IStudentState extends IPersonState {
}

export interface ITeacherState extends IPersonState {
}

export const PERSON_STATE: IPersonState = {
  _id: '',
  firstName: '',
  lastName: '',
  address: '',
  description: ''
};
