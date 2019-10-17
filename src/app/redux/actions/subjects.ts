import { createAction, props, ActionCreator } from '@ngrx/store';
import { Subject } from 'src/app/common/models/subject';

const PAGE: string = '[Subject Page]';

export const loadSubjects: ActionCreator<string, any> = createAction(`${PAGE} Load Subjects`);
export const setSubjects: ActionCreator<string, any> = createAction(`${PAGE} Set Subjects`, props<Subject[]>());

export const loadSubject: ActionCreator<string, any> = createAction(`${PAGE} Load Subject`, props<{ id: string }>());
export const setSubject: ActionCreator<string, any> = createAction(`${PAGE} Set Subject`, props<Subject>());
export const createSubject: ActionCreator<string, any> = createAction(`${PAGE} Create Subject`, props<Subject>());
export const updateSubject: ActionCreator<string, any> = createAction(`${PAGE} Update Subject`, props<Subject>());
export const deleteSubject: ActionCreator<string, any> = createAction(`${PAGE} Delete Subject`, props<Subject>());

export const updateFilterText: ActionCreator<string, any> = createAction(`${PAGE} Update Filter Text`, props<{ filterText: string }>());
export const setFilterText: ActionCreator<string, any> = createAction(`${PAGE} Set Filter Text`, props<{ filterText: string }>());
