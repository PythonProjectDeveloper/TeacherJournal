import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { TeacherService } from 'src/app/common/services/teacher.service';
import * as TeacherPageActions from '../actions/teachers';

@Injectable()
export class TeacherEffects {

  public loadTeachers$ = createEffect(() => this.actions$.pipe(
    ofType(TeacherPageActions.loadTeachers),
    switchMap(() => this.teacherService.getTeachers()),
    map(teachers => TeacherPageActions.setTeachers({ teachers }))
  ));

  constructor(
    private actions$: Actions,
    private teacherService: TeacherService
  ) {}
}
