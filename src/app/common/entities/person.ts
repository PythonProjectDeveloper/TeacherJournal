export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;
}

export interface Student extends Person {
}

export interface Teacher extends Person {
}
