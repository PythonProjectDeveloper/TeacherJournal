import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET, RoutesRecognized, ActivatedRouteSnapshot } from '@angular/router';
import { filter } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import * as _ from 'lodash';

interface Breadcrumb {
  label: string;
  params: Params;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  public breadcrumbs: Breadcrumb[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  private createBreadcrumbs(route: ActivatedRoute, breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;
    for (const child of children) {
      const snapshot: ActivatedRouteSnapshot = child.snapshot;
      const label: string = snapshot.data.breadcrumb;
      const url: string = _.map(snapshot.url, 'path').join('/');

      if (isNullOrUndefined(label)) {
        return this.createBreadcrumbs(child, breadcrumbs);
      }

      breadcrumbs.push({
          url: url,
          label: label,
          params: snapshot.params
        });

      return this.createBreadcrumbs(child, breadcrumbs);
    }

    return breadcrumbs;
  }

  public ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root));
  }

}
