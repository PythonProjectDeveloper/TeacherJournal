
import { createReducer, on, ActionReducer, Action } from '@ngrx/store';
import * as TeacherPageActions from '../actions/teachers';
import { ITeacher } from 'src/app/common/entities/person';

export interface TeacherPageState {
  teachers: ITeacher[];
}

export const initialState: TeacherPageState = {
  teachers: []
};

const teacherReducer: ActionReducer<TeacherPageState> = createReducer(
  initialState,
  on(TeacherPageActions.setTeachers, (state, { teachers }) => ({ ...state, teachers }))
);

export function reducer(state: TeacherPageState | undefined, action: Action): TeacherPageState {
  return teacherReducer(state, action);
}
