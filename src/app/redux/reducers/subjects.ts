
import { createReducer, on, ActionReducer, Action } from '@ngrx/store';
import * as SubjectPageActions from '../actions/subjects';
import { ISubjectState, SUBJECT_STATE } from 'src/app/common/entities/subject';
import { IJournalState, JOURNAL_STATE } from 'src/app/common/entities/journal';

export interface SubjectPageState {
  subjects: ISubjectState[];
  subject: ISubjectState;
  journal: IJournalState;
  filterData: string;
}

export const initialState: SubjectPageState = {
  subjects: [],
  subject: SUBJECT_STATE,
  journal: JOURNAL_STATE,
  filterData: ''
};

const subjectReducer: ActionReducer<SubjectPageState> = createReducer(
  initialState,
  on(SubjectPageActions.setSubjects, (state, { subjects }) => ({ ...state, subjects })),
  on(SubjectPageActions.setSubject, (state, { subject }) => ({ ...state, subject })),
  on(SubjectPageActions.setFilterData, (state, { filterData }) => ({ ...state, filterData })),
  on(SubjectPageActions.setJournal, (state, { journal }) => ({ ...state, journal }))
);

export function reducer(state: SubjectPageState | undefined, action: Action): SubjectPageState {
  return subjectReducer(state, action);
}
