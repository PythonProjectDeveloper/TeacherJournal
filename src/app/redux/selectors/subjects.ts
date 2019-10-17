import { SubjectPageState } from '../reducers/subjects';
import * as _ from 'lodash';
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

export const getFilterText: any = createSelector(
  getSubjectState,
  (state: SubjectPageState) => state.filterText
);
