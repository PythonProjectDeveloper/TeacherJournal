import { Component, OnInit } from '@angular/core';
import { Subject as RXJSSubject } from 'rxjs';
import { Subject } from 'src/app/common/models/subject';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { getSubject } from 'src/app/redux/selectors/subjects';
import { loadSubject } from 'src/app/redux/actions/subjects';
import { selectWithDestroyFlag, setDestroyFlag } from 'src/app/common/helpers/ngrx-widen';
import { GraphService } from 'src/app/common/services/graph.service';
import { SubjectGraphDrawer } from 'src/app/common/models/draph-drawers';

@Component({
  selector: 'app-statistic-subject',
  templateUrl: './statistic-subject.component.html',
  styleUrls: ['./statistic-subject.component.scss']
})
export class StatisticSubjectComponent implements OnInit {
  public subject: Subject;
  public destroy$: RXJSSubject<boolean> = new RXJSSubject<boolean>();
  public graphDrawer = new SubjectGraphDrawer();
  public selector = 'graph';

  constructor(
    private store: Store<IGlobalState>,
    private route: ActivatedRoute,
    private graphService: GraphService
  ) { }

  public ngOnInit(): void {
    selectWithDestroyFlag(this.store, this.destroy$, getSubject).subscribe(subject => {
      this.subject = subject;

      if (subject._id) {
        const graphWrapper: HTMLElement = document.getElementById(this.selector);

        if (graphWrapper) {
          graphWrapper.innerHTML = '';
        }

        this.graphService.getSubjectGraphData(subject._id).subscribe(data => this.graphDrawer.draw(data, `.${this.selector}`));
      }
    });
    setDestroyFlag(this.route.params, this.destroy$).subscribe(({ id }) => this.store.dispatch(loadSubject({ id })));
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
