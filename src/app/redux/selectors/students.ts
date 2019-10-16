import { StudentPageState } from '../reducers/students';
import * as _ from 'lodash';
import { IReducer } from '../reducers';

export const getStudents: any = (state: IReducer) => state.students.students;
export const getStudent: any = (state: IReducer) => state.students.student;
export const getFilterText: any = (state: IReducer) => state.students.filterText;
