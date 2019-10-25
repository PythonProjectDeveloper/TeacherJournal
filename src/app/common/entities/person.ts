export interface IPerson {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;
}

export interface IStudent extends IPerson {
}

export interface ITeacher extends IPerson {
}
