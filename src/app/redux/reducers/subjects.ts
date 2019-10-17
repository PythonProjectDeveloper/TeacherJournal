
import { createReducer, on, ActionReducer, Action } from '@ngrx/store';
import * as SubjectPageActions from '../actions/subjects';
import { Subject } from 'src/app/common/models/subject';

export interface SubjectPageState {
  subjects: Subject[];
  subject: Subject;
  filterText: string;
}

export const initialState: SubjectPageState = {
  subjects: [],
  subject: new Subject(),
  filterText: ''
};

const subjectReducer: ActionReducer<SubjectPageState> = createReducer(
  initialState,
  on(SubjectPageActions.setSubjects, (state, { subjects }) => ({ ...state, subjects })),
  on(SubjectPageActions.setSubject, (state, { subject }) => ({ ...state, subject })),
  on(SubjectPageActions.setFilterText, (state, { filterText }) => ({ ...state, filterText }))
);

export function reducer(state: SubjectPageState | undefined, action: Action): SubjectPageState {
  return subjectReducer(state, action);
}
