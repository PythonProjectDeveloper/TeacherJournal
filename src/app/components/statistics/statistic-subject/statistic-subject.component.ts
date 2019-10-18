import { Component, OnInit } from '@angular/core';
import { Subject as RXJSSubject } from 'rxjs';
import { Subject } from 'src/app/common/models/subject';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { takeUntil } from 'rxjs/operators';
import { getSubject } from 'src/app/redux/selectors/subjects';
import { loadSubject } from 'src/app/redux/actions/subjects';

@Component({
  selector: 'app-statistic-subject',
  templateUrl: './statistic-subject.component.html',
  styleUrls: ['./statistic-subject.component.scss']
})
export class StatisticSubjectComponent implements OnInit {
  public subject: Subject;
  public destroy$: RXJSSubject<boolean> = new RXJSSubject<boolean>();

  constructor(
    private store: Store<IGlobalState>,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.store.pipe(takeUntil(this.destroy$), select(getSubject)).subscribe(subject => this.subject = subject);

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(({ id }) => this.store.dispatch(loadSubject({ id })));
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
