import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom, tap, pluck } from 'rxjs/operators';
import { StudentService } from 'src/app/common/services/student.service';
import * as StudentPageActions from '../actions/students';
import { Store, select } from '@ngrx/store';
import { IReducer } from '../reducers';
import { getFilterText } from '../selectors/students';

@Injectable()
export class StudentEffects {

  public loadStudents$ = createEffect(() => this.actions$.pipe(
    ofType(StudentPageActions.loadStudents),
    withLatestFrom(this.store.pipe(select(getFilterText))),
    switchMap(([_, filterText]) => this.studentService.getStudents(filterText)
      .pipe(
        map(students => StudentPageActions.setStudents({ students }))
      ))
    )
  );

  public loadStudent$ = createEffect(() => this.actions$.pipe(
    ofType(StudentPageActions.loadStudent),
    switchMap(id => this.studentService.getStudent(id)
      .pipe(
        map(student => StudentPageActions.setStudent(student))
      ))
    )
  );

  public updateStudent$ = createEffect(() => this.actions$.pipe(
    ofType(StudentPageActions.updateStudent),
    switchMap(person => this.studentService.updateStudent(person)
      .pipe(
        map(student => StudentPageActions.updateStudent(student))
      ))
    )
  );

  public createStudent$ = createEffect(() => this.actions$.pipe(
    ofType(StudentPageActions.createStudent),
    switchMap(person => this.studentService.createStudent(person)
      .pipe(
        map(student => StudentPageActions.createStudent(student))
      ))
    )
  );

  public deleteStudent$ = createEffect(() => this.actions$.pipe(
    ofType(StudentPageActions.deleteStudent),
    switchMap(person => this.studentService.deleteStudent(person)),
    map(() => StudentPageActions.loadStudents())
    )
  );

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
    private store: Store<IReducer>
  ) {}
}
