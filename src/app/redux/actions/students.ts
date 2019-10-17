import { createAction, props, ActionCreator } from '@ngrx/store';
import { Student } from 'src/app/common/models/person';

const PAGE: string = '[Student Page]';

export const loadStudents: ActionCreator<string, any> = createAction(`${PAGE} Load Students`);
export const setStudents: ActionCreator<string, any> = createAction(`${PAGE} Set Students`, props<Student[]>());

export const loadStudent: ActionCreator<string, any> = createAction(`${PAGE} Load Student`, props<{ id: string }>());
export const setStudent: ActionCreator<string, any> = createAction(`${PAGE} Set Student`, props<Student>());
export const createStudent: ActionCreator<string, any> = createAction(`${PAGE} Create Student`, props<Student>());
export const updateStudent: ActionCreator<string, any> = createAction(`${PAGE} Update Student`, props<Student>());
export const deleteStudent: ActionCreator<string, any> = createAction(`${PAGE} Delete Student`, props<Student>());

export const updateFilterText: ActionCreator<string, any> = createAction(`${PAGE} Update Filter Text`, props<{ filterText: string }>());
export const setFilterText: ActionCreator<string, any> = createAction(`${PAGE} Set Filter Text`, props<{ filterText: string }>());
