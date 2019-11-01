import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Output() public valueChanged = new EventEmitter<string>();

  public searchText: string = '';

  public onClick(): void {
    this.valueChanged.emit(this.searchText);
  }

}
