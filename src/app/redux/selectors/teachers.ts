import { TeacherPageState } from '../reducers/teachers';
import { IGlobalState } from '../reducers';
import { createSelector } from '@ngrx/store';

export const getTeacherState: any = (state: IGlobalState) => state.teachers;

export const getTeachers: any = createSelector(
  getTeacherState,
  (state: TeacherPageState) => state.teachers
);
