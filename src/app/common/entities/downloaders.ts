import { ExportType, TableType } from '../constants/constants-export';
import { Person } from '../models/person';
import { Journal } from '../models/journal';
import { Subject } from '../models/subject';

export interface ITableStudents {
  parseStudentData(students: Person[]): any;
}

export interface ITableSubjects {
  parseSubjectData(subjects: Subject[]): any;
}

export interface ITableJournal {
  parseJournalData(journals: Journal[]): any;
}

export type IDownloaders = {
  [key in ExportType]: IDownloader;
};

export interface IDownloader {
  export(tableType: TableType, data: any): void;
}
