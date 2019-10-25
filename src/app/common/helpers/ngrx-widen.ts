import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { select } from '@ngrx/store';

export function setDestroyFlag(resource: Observable<any>, destroyFlag: Subject<any>): Observable<any> {
  return resource.pipe(takeUntil(destroyFlag));
}

export function selectWithDestroyFlag(resource: Observable<any>, destroyFlag: Subject<any>, selector: any): Observable<any> {
  return setDestroyFlag(resource, destroyFlag).pipe(select(selector));
}
