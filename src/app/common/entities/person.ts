export interface IPerson {
  _id: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;
}

export interface IStudent extends IPerson {
}

export interface ITeacher extends IPerson {
}

export const PERSON: IPerson = {
  _id: '',
  firstName: '',
  lastName: '',
  address: '',
  description: ''
};
