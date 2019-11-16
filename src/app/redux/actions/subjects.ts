import { createAction, props, ActionCreator } from '@ngrx/store';
import { ISubject } from 'src/app/common/entities/subject';
import { IJournal } from 'src/app/common/entities/journal';

const PAGE: string = '[ISubject Page]';

export const loadSubjects: ActionCreator<string, any> = createAction(`${PAGE} Load Subjects`);
export const setSubjects: ActionCreator<string, any> = createAction(`${PAGE} Set Subjects`, props<ISubject[]>());

export const loadSubject: ActionCreator<string, any> = createAction(`${PAGE} Load ISubject`, props<{ id: string }>());
export const setSubject: ActionCreator<string, any> = createAction(`${PAGE} Set ISubject`, props<ISubject>());
export const createSubject: ActionCreator<string, any> = createAction(`${PAGE} Create ISubject`, props<ISubject>());
export const updateSubject: ActionCreator<string, any> = createAction(`${PAGE} Update ISubject`, props<ISubject>());
export const deleteSubject: ActionCreator<string, any> = createAction(`${PAGE} Delete ISubject`, props<ISubject>());

export const updateFilterData: ActionCreator<string, any> = createAction(`${PAGE} Update Filter Text`, props<{ filterData: string }>());
export const setFilterData: ActionCreator<string, any> = createAction(`${PAGE} Set Filter Text`, props<{ filterData: string }>());

export const loadJournal: ActionCreator<string, any> = createAction(`${PAGE} Load IJournal`, props<{ id: string }>());
export const setJournal: ActionCreator<string, any> = createAction(`${PAGE} Set IJournal`, props<IJournal>());
export const updateJournal: ActionCreator<string, any> = createAction(`${PAGE} Update IJournal`, props<IJournal>());
