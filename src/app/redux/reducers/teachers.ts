
import { createReducer, on, ActionReducer, Action } from '@ngrx/store';
import * as TeacherPageActions from '../actions/teachers';
import { Teacher } from 'src/app/common/models/person';

export interface TeacherPageState {
  teachers: Teacher[];
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
