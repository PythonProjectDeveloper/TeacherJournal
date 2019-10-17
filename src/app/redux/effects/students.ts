import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { StudentService } from 'src/app/common/services/student.service';
import * as StudentPageActions from '../actions/students';
import { Store, select } from '@ngrx/store';
import { IGlobalState } from '../reducers';
import { getFilterText } from '../selectors/students';

@Injectable()
export class StudentEffects {

  public loadStudents$ = createEffect(() => this.actions$.pipe(
    ofType(StudentPageActions.loadStudents),
    withLatestFrom(this.store.pipe(select(getFilterText))),
    switchMap(([_, filterText]) => this.studentService.getStudents(filterText)),
    map(students => StudentPageActions.setStudents({ students }))
  ));

  public loadStudent$ = createEffect(() => this.actions$.pipe(
    ofType(StudentPageActions.loadStudent),
    map(action => action.id),
    switchMap(id => this.studentService.getStudent(id)),
    map(student => StudentPageActions.setStudent({ student }))
  ));

  public updateStudent$ = createEffect(() => this.actions$.pipe(
    ofType(StudentPageActions.updateStudent),
    switchMap(student => this.studentService.updateStudent(student)),
    map(student => StudentPageActions.setStudent({ student }))
  ));

  public createStudent$ = createEffect(() => this.actions$.pipe(
    ofType(StudentPageActions.createStudent),
    switchMap(student => this.studentService.createStudent(student)),
    map(student => StudentPageActions.setStudent({ student }))
  ));

  public deleteStudent$ = createEffect(() => this.actions$.pipe(
    ofType(StudentPageActions.deleteStudent),
    switchMap(student => this.studentService.deleteStudent(student)),
    map(() => StudentPageActions.loadStudents())
  ));

  public updateFilterText$ = createEffect(() => this.actions$.pipe(
    ofType(StudentPageActions.updateFilterText),
    map(action => action.filterText),
    switchMap(filterText => [
      StudentPageActions.setFilterText({ filterText }),
      StudentPageActions.loadStudents()
    ])
  ));

  constructor(
    private actions$: Actions,
    private studentService: StudentService,
    private store: Store<IGlobalState>
  ) {}
}
