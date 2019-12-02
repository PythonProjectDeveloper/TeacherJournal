import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SubjectService } from 'src/app/common/services/subject.service';
import * as SubjectPageActions from '../actions/subjects';
import { Store, select } from '@ngrx/store';
import { IGlobalState } from '../reducers';
import { getFilterData } from '../selectors/subjects';
import { JournalService } from 'src/app/common/services/journal.service';

@Injectable()
export class SubjectEffects {

  public loadSubjects$ = createEffect(() => this.actions$.pipe(
    ofType(SubjectPageActions.loadSubjects),
    withLatestFrom(this.store.pipe(select(getFilterData))),
    switchMap(([_, filterData]) => this.subjectService.getSubjects(filterData)),
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
    switchMap(subject => this.subjectService.updateSubject(subject)),
    map(subject => SubjectPageActions.setSubject({ subject }))
  ));

  public createSubject$ = createEffect(() => this.actions$.pipe(
    ofType(SubjectPageActions.createSubject),
    switchMap(subject => this.subjectService.createSubject(subject)),
    map(subject => SubjectPageActions.setSubject({ subject }))
  ));

  public deleteSubject$ = createEffect(() => this.actions$.pipe(
    ofType(SubjectPageActions.deleteSubject),
    switchMap(subject => this.subjectService.deleteSubject(subject)),
    map(() => SubjectPageActions.loadSubjects())
  ));

  public updateFilterData$ = createEffect(() => this.actions$.pipe(
    ofType(SubjectPageActions.updateFilterData),
    map(action => action.filterData),
    switchMap(filterData => [
      SubjectPageActions.setFilterData({ filterData }),
      SubjectPageActions.loadSubjects()
    ])
  ));

  public loadJournal$ = createEffect(() => this.actions$.pipe(
    ofType(SubjectPageActions.loadJournal),
    map(action => action.id),
    switchMap(id => this.journalService.getJournal(id)),
    map(journal => SubjectPageActions.setJournal({ journal }))
  ));

  public updateJournal$ = createEffect(() => this.actions$.pipe(
    ofType(SubjectPageActions.updateJournal),
    switchMap(journal => this.journalService.updateJournal(journal)),
    map(journal => SubjectPageActions.setJournal({ journal }))
  ));

  constructor(
    private actions$: Actions,
    private subjectService: SubjectService,
    private journalService: JournalService,
    private store: Store<IGlobalState>
  ) {}
}
