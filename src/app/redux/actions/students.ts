import { createAction, props, ActionCreator } from '@ngrx/store';
import { Student } from 'src/app/common/models/person';

export const loadStudents: ActionCreator<string, any> = createAction('[Student Page] Load Students');
export const setStudents: ActionCreator<string, any> = createAction('[Student Page] Set Students', props<Student[]>());

export const loadStudent: ActionCreator<string, any> = createAction('[Student Page] Load Student', props<{ id: string }>());
export const setStudent: ActionCreator<string, any> = createAction('[Student Page] Set Student', props<Student>());
export const createStudent: ActionCreator<string, any> = createAction('[Student Page] Create Student', props<Student>());
export const updateStudent: ActionCreator<string, any> = createAction('[Student Page] Update Student', props<Student>());
export const deleteStudent: ActionCreator<string, any> = createAction('[Student Page] Delete Student', props<Student>());

export const updateFilterText: ActionCreator<string, any> = createAction('[Student Page] update Filter Text', props<{ filterText: string }>());
export const setFilterText: ActionCreator<string, any> = createAction('[Student Page] Set Filter Text', props<{ filterText: string }>());
