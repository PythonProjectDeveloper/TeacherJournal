import { Component } from '@angular/core';
import { ExportType, TableType } from 'src/app/common/constants/constants-export';
import { DownloadService } from 'src/app/common/services/downloader.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent {
  public type: ExportType;
  public types = ExportType;
  public isSelectWindowClosed = true;

  constructor(
    private downloaderSirvice: DownloadService
  ) { }

  public onExport(tableType: TableType): void {
    this.downloaderSirvice.export(tableType);
    this.setSelectWindowState(true);
  }

  public showSelectWindow(type: ExportType): void {
    this.type = type;
    this.downloaderSirvice.setDownloader(type);

    this.setSelectWindowState(false);
  }

  public setSelectWindowState(flag: boolean): void {
    this.isSelectWindowClosed = flag;
  }
}
