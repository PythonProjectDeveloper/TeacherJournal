import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ExportType, TableType } from 'src/app/common/constants/constants-export';

@Component({
  selector: 'app-export-toolbar',
  templateUrl: './export-toolbar.component.html',
  styleUrls: ['./export-toolbar.component.scss']
})
export class ExportToolbarComponent {
  @Output() public save = new EventEmitter();
  @Output() public cancel = new EventEmitter();
  @Input() public type: ExportType;
  public table = TableType.STUDENTS;
  public tables = TableType;

  public onSave(): void {
    this.save.emit(this.table);
  }

  public onCancel(): void {
    this.cancel.emit();
  }
}
