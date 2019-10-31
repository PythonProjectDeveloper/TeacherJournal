import { IDownloaders, IDownloader } from '../entities/downloaders';
import { ExportType, TableType, Extantions, DateType } from '../constants/constants-export';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

export class PDFDownloader implements IDownloader {
  public export(tableType: TableType, data: any[]): void {
    const fileName: string = tableType + Extantions.PDF;
    const doc: jsPDF = new jsPDF();
    const [col, rows] = this.getData(data);

    doc.autoTable(col, rows);

    doc.save(fileName);
  }

  public getData(data: any[]): any[] {
    const col: string[] = [...Object.keys(data[0])];
    const rows: any[] = [];

    data.forEach(rowObj => {
      const row: any[] = [...Object.values(rowObj)];
      rows.push(row);
    });

    return [col, rows];
  }
}

export class ExcelDownloader implements IDownloader {
  public export(tableType: TableType, data: any): void {
    const buffer: any = this.getBuffer(data);
    const saveData: Blob = new Blob([buffer], { type: DateType.EXCEL });
    const fileName: string = tableType + Extantions.EXCEL;

    FileSaver.saveAs(saveData, fileName);
  }

  public getBuffer(data: any): any {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    return excelBuffer;
  }
}

export const DOWNLOADERS: IDownloaders = {
  [ExportType.EXCEL]: new ExcelDownloader(),
  [ExportType.PDF]: new PDFDownloader()
};
