import { createAction, props, ActionCreator } from '@ngrx/store';
import { ITeacherState } from 'src/app/common/entities/person';

const PAGE: string = '[ITeacher Page]';

export const loadTeachers: ActionCreator<string, any> = createAction(`${PAGE} Load Teachers`);
export const setTeachers: ActionCreator<string, any> = createAction(`${PAGE} Set Teachers`, props<ITeacherState[]>());
