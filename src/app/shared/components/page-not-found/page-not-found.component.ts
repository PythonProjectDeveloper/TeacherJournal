import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  @Input() imageUrl: string = 'assets/images/not-found.png';
  @Input() title: string = 'Page not found';
  @Input() description: string = 'Maybe you entered the URL incorrectly. Try again or give it up)';
}
