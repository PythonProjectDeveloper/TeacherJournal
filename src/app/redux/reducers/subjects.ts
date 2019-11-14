
import { createReducer, on, ActionReducer, Action } from '@ngrx/store';
import * as SubjectPageActions from '../actions/subjects';
import { ISubject, SUBJECT } from 'src/app/common/entities/subject';
import { IJournal, JOURNAL } from 'src/app/common/entities/journal';

export interface SubjectPageState {
  subjects: ISubject[];
  subject: ISubject;
  journal: IJournal;
  filterText: string;
}

export const initialState: SubjectPageState = {
  subjects: [],
  subject: SUBJECT,
  journal: JOURNAL,
  filterText: ''
};

const subjectReducer: ActionReducer<SubjectPageState> = createReducer(
  initialState,
  on(SubjectPageActions.setSubjects, (state, { subjects }) => ({ ...state, subjects })),
  on(SubjectPageActions.setSubject, (state, { subject }) => ({ ...state, subject })),
  on(SubjectPageActions.setFilterText, (state, { filterText }) => ({ ...state, filterText })),
  on(SubjectPageActions.setJournal, (state, { journal }) => ({ ...state, journal }))
);

export function reducer(state: SubjectPageState | undefined, action: Action): SubjectPageState {
  return subjectReducer(state, action);
}
