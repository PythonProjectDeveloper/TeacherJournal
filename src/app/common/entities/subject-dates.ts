export interface ISubjectDates {
  subjectName: string;
  dates: IDate[];
}

export interface IDate {
  name: string;
  state: boolean | null;
}
