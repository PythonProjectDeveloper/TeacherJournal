import { Component, OnInit } from '@angular/core';
import { Subject as RXJSSubject } from 'rxjs';
import { Subject } from 'src/app/common/models/subject';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { getSubject } from 'src/app/redux/selectors/subjects';
import { loadSubject } from 'src/app/redux/actions/subjects';
import { selectWithDestroyFlag, setDestroyFlag } from 'src/app/common/helpers/ngrx-widen';

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
    selectWithDestroyFlag(this.store, this.destroy$, getSubject).subscribe(subject => this.subject = subject);
    setDestroyFlag(this.route.params, this.destroy$).subscribe(({ id }) => this.store.dispatch(loadSubject({ id })));
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
