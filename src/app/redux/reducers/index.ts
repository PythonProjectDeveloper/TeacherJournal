import { reducer as studentReducer, StudentPageState } from './students';

export interface IGlobalState {
  students: StudentPageState;
}

export const reducers: any = {
  students: studentReducer
};
