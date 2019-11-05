import { ExportType, TableType } from '../constants/constants-export';

export type IDownloaders = {
  [key in ExportType]: IDownloader;
};

export interface IDownloader {
  export(tableType: TableType, data: any): void;
}
