import { createAction, props, ActionCreator } from '@ngrx/store';
import { ISubjectState } from 'src/app/common/entities/subject';
import { IJournalState } from 'src/app/common/entities/journal';

const PAGE: string = '[ISubject Page]';

export const loadSubjects: ActionCreator<string, any> = createAction(`${PAGE} Load Subjects`);
export const setSubjects: ActionCreator<string, any> = createAction(`${PAGE} Set Subjects`, props<ISubjectState[]>());

export const loadSubject: ActionCreator<string, any> = createAction(`${PAGE} Load ISubject`, props<{ id: string }>());
export const setSubject: ActionCreator<string, any> = createAction(`${PAGE} Set ISubject`, props<ISubjectState>());
export const createSubject: ActionCreator<string, any> = createAction(`${PAGE} Create ISubject`, props<ISubjectState>());
export const updateSubject: ActionCreator<string, any> = createAction(`${PAGE} Update ISubject`, props<ISubjectState>());
export const deleteSubject: ActionCreator<string, any> = createAction(`${PAGE} Delete ISubject`, props<ISubjectState>());

export const updateFilterData: ActionCreator<string, any> = createAction(`${PAGE} Update Filter Text`, props<{ filterData: string }>());
export const setFilterData: ActionCreator<string, any> = createAction(`${PAGE} Set Filter Text`, props<{ filterData: string }>());

export const loadJournal: ActionCreator<string, any> = createAction(`${PAGE} Load IJournal`, props<{ id: string }>());
export const setJournal: ActionCreator<string, any> = createAction(`${PAGE} Set IJournal`, props<IJournalState>());
export const updateJournal: ActionCreator<string, any> = createAction(`${PAGE} Update IJournal`, props<IJournalState>());
