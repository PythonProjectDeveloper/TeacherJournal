import { Component, OnInit, OnDestroy } from '@angular/core';
import { Person } from 'src/app/common/models/person';
import { ActivatedRoute } from '@angular/router';
import { Subject as RXJSSubject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { getStudent } from 'src/app/redux/selectors/students';
import { loadStudent } from 'src/app/redux/actions/students';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-statistic-student',
  templateUrl: './statistic-student.component.html',
  styleUrls: ['./statistic-student.component.scss']
})
export class StatisticStudentComponent implements OnInit, OnDestroy {
  public student: Person;
  public destroy$: RXJSSubject<boolean> = new RXJSSubject<boolean>();

  constructor(
    private store: Store<IGlobalState>,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.store.pipe(takeUntil(this.destroy$), select(getStudent)).subscribe(student => this.student = student);

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(({ id }) => this.store.dispatch(loadStudent({ id })));
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
