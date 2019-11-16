import { createAction, props, ActionCreator } from '@ngrx/store';
import { IStudent } from 'src/app/common/entities/person';

const PAGE: string = '[IStudent Page]';

export const loadStudents: ActionCreator<string, any> = createAction(`${PAGE} Load Students`);
export const setStudents: ActionCreator<string, any> = createAction(`${PAGE} Set Students`, props<IStudent[]>());

export const loadStudent: ActionCreator<string, any> = createAction(`${PAGE} Load IStudent`, props<{ id: string }>());
export const setStudent: ActionCreator<string, any> = createAction(`${PAGE} Set IStudent`, props<IStudent>());
export const createStudent: ActionCreator<string, any> = createAction(`${PAGE} Create IStudent`, props<IStudent>());
export const updateStudent: ActionCreator<string, any> = createAction(`${PAGE} Update IStudent`, props<IStudent>());
export const deleteStudent: ActionCreator<string, any> = createAction(`${PAGE} Delete IStudent`, props<IStudent>());

export const updateFilterData: ActionCreator<string, any> = createAction(`${PAGE} Update Filter Text`, props<{ filterData: string }>());
export const setFilterData: ActionCreator<string, any> = createAction(`${PAGE} Set Filter Text`, props<{ filterData: string }>());
