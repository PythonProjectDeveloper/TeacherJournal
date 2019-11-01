export interface IJournal {
  id: string;
  subjectName: string;
  dayNames: string[];
  studentMarks: IStudentMark[];
}

export interface IStudentMark {
  studentId: string;
  firstName: string;
  lastName: string;
  marks: number[]| null[];
}
