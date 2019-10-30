import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-simple-message',
  templateUrl: './simple-message.component.html',
  styleUrls: ['./simple-message.component.scss']
})
export class SimpleMessageComponent {
  @Input() public data: any;
}
