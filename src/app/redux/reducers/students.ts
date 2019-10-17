
import { createReducer, on, ActionReducer, Action } from '@ngrx/store';
import * as StudentPageActions from '../actions/students';
import { Student } from 'src/app/common/models/person';

export interface StudentPageState {
  students: Student[];
  student: Student;
  filterText: string;
}

export const initialState: StudentPageState = {
  students: [],
  student: new Student(),
  filterText: ''
};

const studentReducer: ActionReducer<StudentPageState> = createReducer(
  initialState,
  on(StudentPageActions.setStudents, (state, { students }) => ({ ...state, students })),
  on(StudentPageActions.setStudent, (state, { student }) => ({ ...state, student })),
  on(StudentPageActions.setFilterText, (state, { filterText }) => ({ ...state, filterText }))
);

export function reducer(state: StudentPageState | undefined, action: Action): StudentPageState {
  return studentReducer(state, action);
}
