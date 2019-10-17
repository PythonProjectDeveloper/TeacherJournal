import { createAction, props, ActionCreator } from '@ngrx/store';
import { Teacher } from 'src/app/common/models/person';

const PAGE: string = '[Teacher Page]';

export const loadTeachers: ActionCreator<string, any> = createAction(`${PAGE} Load Teachers`);
export const setTeachers: ActionCreator<string, any> = createAction(`${PAGE} Set Teachers`, props<Teacher[]>());
