export enum ExportType {
  EXCEL = 'EXCEL',
  PDF = 'PDF',
}

export enum TableType {
  STUDENTS = 'students',
  SUBJECTS = 'subjects',
  JOURNALS = 'journals'
}

export enum DateType {
  EXCEL = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  PDF = ''
}

export enum Extantions {
  EXCEL = '.xlsx',
  PDF = '.pdf'
}

export const STUDENTS_EXPORT_API_URL: string = 'export/students';
export const SUBJECTS_EXPORT_API_URL: string = 'export/subjects';
export const JOURNALS_EXPORT_API_URL: string = 'export/journals';
