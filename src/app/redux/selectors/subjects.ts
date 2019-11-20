import { SubjectPageState } from '../reducers/subjects';
import { IGlobalState } from '../reducers';
import { createSelector } from '@ngrx/store';

export const getSubjectState: any = (state: IGlobalState) => state.subjects;

export const getSubjects: any = createSelector(
  getSubjectState,
  (state: SubjectPageState) => state.subjects
);

export const getSubject: any = createSelector(
  getSubjectState,
  (state: SubjectPageState) => state.subject
);

export const getFilterData: any = createSelector(
  getSubjectState,
  (state: SubjectPageState) => state.filterData
);

export const getJournal: any = createSelector(
  getSubjectState,
  (state: SubjectPageState) => state.journal
);
