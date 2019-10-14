import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  public imageUrl: string;
  public titleText: string;
  public description: string;

  constructor(public route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const data: Data = this.route.snapshot.data;
      this.imageUrl = data.imageUrl;
      this.titleText = data.titleText;
      this.description = data.description;
    });
  }
}
