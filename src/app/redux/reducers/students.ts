
import { createReducer, on, ActionReducer, Action } from '@ngrx/store';
import * as StudentPageActions from '../actions/students';
import { IStudent, PERSON } from 'src/app/common/entities/person';

export interface StudentPageState {
  students: IStudent[];
  student: IStudent;
  filterData: string;
}

export const initialState: StudentPageState = {
  students: [],
  student: PERSON,
  filterData: ''
};

const studentReducer: ActionReducer<StudentPageState> = createReducer(
  initialState,
  on(StudentPageActions.setStudents, (state, { students }) => ({ ...state, students })),
  on(StudentPageActions.setStudent, (state, { student }) => ({ ...state, student })),
  on(StudentPageActions.setFilterData, (state, { filterData }) => ({ ...state, filterData }))
);

export function reducer(state: StudentPageState | undefined, action: Action): StudentPageState {
  return studentReducer(state, action);
}
