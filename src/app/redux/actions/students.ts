import { createAction, props, ActionCreator } from '@ngrx/store';
import { IStudentState } from 'src/app/common/entities/person';

const PAGE: string = '[IStudent Page]';

export const loadStudents: ActionCreator<string, any> = createAction(`${PAGE} Load Students`);
export const setStudents: ActionCreator<string, any> = createAction(`${PAGE} Set Students`, props<IStudentState[]>());

export const loadStudent: ActionCreator<string, any> = createAction(`${PAGE} Load IStudent`, props<{ id: string }>());
export const setStudent: ActionCreator<string, any> = createAction(`${PAGE} Set IStudent`, props<IStudentState>());
export const createStudent: ActionCreator<string, any> = createAction(`${PAGE} Create IStudent`, props<IStudentState>());
export const updateStudent: ActionCreator<string, any> = createAction(`${PAGE} Update IStudent`, props<IStudentState>());
export const deleteStudent: ActionCreator<string, any> = createAction(`${PAGE} Delete IStudent`, props<IStudentState>());

export const updateFilterData: ActionCreator<string, any> = createAction(`${PAGE} Update Filter Text`, props<{ filterData: string }>());
export const setFilterData: ActionCreator<string, any> = createAction(`${PAGE} Set Filter Text`, props<{ filterData: string }>());
