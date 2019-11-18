import { OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { select } from '@ngrx/store';

export abstract class EventDestroyer implements OnDestroy {
  public destroy$: Subject<boolean> = new Subject<boolean>();

  public setDestroyFlag(resource: Observable<any>): Observable<any> {
    return resource.pipe(takeUntil(this.destroy$));
  }

  public selectWithDestroyFlag(resource: Observable<any>, selector: any): Observable<any> {
    return this.setDestroyFlag(resource).pipe(select(selector));
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
