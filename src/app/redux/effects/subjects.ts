import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SubjectService } from 'src/app/common/services/subject.service';
import * as SubjectPageActions from '../actions/subjects';
import { Store, select } from '@ngrx/store';
import { IGlobalState } from '../reducers';
import { getFilterText } from '../selectors/subjects';

@Injectable()
export class SubjectEffects {

  public loadSubjects$ = createEffect(() => this.actions$.pipe(
    ofType(SubjectPageActions.loadSubjects),
    withLatestFrom(this.store.pipe(select(getFilterText))),
    switchMap(([_, filterText]) => this.subjectService.getSubjects(filterText)),
    map(subjects => SubjectPageActions.setSubjects({ subjects }))
  ));

  public loadSubject$ = createEffect(() => this.actions$.pipe(
    ofType(SubjectPageActions.loadSubject),
    map(action => action.id),
    switchMap(id => this.subjectService.getSubject(id)),
    map(subject => SubjectPageActions.setSubject({ subject }))
  ));

  public updateSubject$ = createEffect(() => this.actions$.pipe(
    ofType(SubjectPageActions.updateSubject),
    switchMap(person => this.subjectService.updateSubject(person)),
    map(subject => SubjectPageActions.setSubject({ subject }))
  ));

  public createSubject$ = createEffect(() => this.actions$.pipe(
    ofType(SubjectPageActions.createSubject),
    switchMap(person => this.subjectService.createSubject(person)),
    map(subject => SubjectPageActions.setSubject({ subject }))
  ));

  public deleteSubject$ = createEffect(() => this.actions$.pipe(
    ofType(SubjectPageActions.deleteSubject),
    switchMap(person => this.subjectService.deleteSubject(person)),
    map(() => SubjectPageActions.loadSubjects())
  ));

  public updateFilterText$ = createEffect(() => this.actions$.pipe(
    ofType(SubjectPageActions.updateFilterText),
    map(action => action.filterText),
    switchMap(filterText => [
      SubjectPageActions.setFilterText({ filterText }),
      SubjectPageActions.loadSubjects()
    ])
  ));

  constructor(
    private actions$: Actions,
    private subjectService: SubjectService,
    private store: Store<IGlobalState>
  ) {}
}
