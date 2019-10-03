import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  @Input() imageUrl: string;
  @Input() title: string;
  @Input() description: string;
}
