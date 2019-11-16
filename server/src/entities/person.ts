import { Document } from 'mongoose';

export interface IPerson {
  firstName: string;
  lastName: string;
  address: string;
  description: string;
}

export interface IStudent extends IPerson { }
export interface ITeacher extends IPerson { }

export interface IPersonModel extends IPerson, Document { }
export interface IStudentModel extends IStudent, Document { }
export interface ITeacherModel extends ITeacher, Document { }
