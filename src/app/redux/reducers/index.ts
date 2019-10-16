import { reducer as studentReducer, StudentPageState } from './students';

export interface IReducer {
  students: StudentPageState;
}

export const reducers: any = {
  students: studentReducer
};
