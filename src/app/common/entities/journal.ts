export interface IJournal {
  subjectId: string;
  days: IDay[];
}

export interface IDay {
  name: string | null;
  marks: IMark[];
}

export interface IMark {
  studentId: string;
  value: number | null;
}
