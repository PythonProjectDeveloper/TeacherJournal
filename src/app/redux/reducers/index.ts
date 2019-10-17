import { reducer as studentReducer, StudentPageState } from './students';
import { reducer as subjectReducer, SubjectPageState } from './subjects';
import { reducer as teacherReducer, TeacherPageState } from './teachers';

export interface IGlobalState {
  students: StudentPageState;
  subjects: SubjectPageState;
  teachers: TeacherPageState;
}

export const reducers: any = {
  students: studentReducer,
  subjects: subjectReducer,
  teachers: teacherReducer
};
