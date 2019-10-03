export interface Journal {
  subjectId: string;
  days: Day[];
}

export interface Day {
  name: string | null;
  marks: Mark[];
}

export interface Mark {
  studentId: string;
  value: number | null;
}
