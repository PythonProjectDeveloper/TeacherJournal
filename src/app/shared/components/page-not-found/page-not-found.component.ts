import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  imageUrl: string;
  titleText: string;
  description: string;

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const data = this.route.snapshot.data;
      this.imageUrl = data.imageUrl;
      this.titleText = data.titleText;
      this.description = data.description;
    });
  }
}
