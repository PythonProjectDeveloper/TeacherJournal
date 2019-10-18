import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnDestroy {
  public imageUrl: string;
  public titleText: string;
  public description: string;
  public subscription: Subscription;

  constructor(
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params) => {
      const data: Data = this.route.snapshot.data;
      this.imageUrl = data.imageUrl;
      this.titleText = data.titleText;
      this.description = data.description;
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
