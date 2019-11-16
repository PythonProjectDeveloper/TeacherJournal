import { StudentPageState } from '../reducers/students';
import * as _ from 'lodash';
import { IGlobalState } from '../reducers';
import { createSelector } from '@ngrx/store';

export const getStudentState: any = (state: IGlobalState) => state.students;

export const getStudents: any = createSelector(
  getStudentState,
  (state: StudentPageState) => state.students
);

export const getStudent: any = createSelector(
  getStudentState,
  (state: StudentPageState) => state.student
);

export const getFilterData: any = createSelector(
  getStudentState,
  (state: StudentPageState) => state.filterData
);
