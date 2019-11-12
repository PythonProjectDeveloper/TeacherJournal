import { Component, OnInit, OnDestroy } from '@angular/core';
import { Person } from 'src/app/common/models/person';
import { ActivatedRoute } from '@angular/router';
import { Subject as RXJSSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { getStudent } from 'src/app/redux/selectors/students';
import { loadStudent } from 'src/app/redux/actions/students';
import { setDestroyFlag, selectWithDestroyFlag } from 'src/app/common/helpers/ngrx-widen';
import { GraphService } from 'src/app/common/services/graph.service';
import { StudentGraphDrawer } from 'src/app/common/models/draph-drawers';

@Component({
  selector: 'app-statistic-student',
  templateUrl: './statistic-student.component.html',
  styleUrls: ['./statistic-student.component.scss']
})
export class StatisticStudentComponent implements OnInit, OnDestroy {
  public student: Person;
  public destroy$: RXJSSubject<boolean> = new RXJSSubject<boolean>();
  public graphDrawer = new StudentGraphDrawer();
  public selector = 'graph';

  constructor(
    private store: Store<IGlobalState>,
    private route: ActivatedRoute,
    private graphService: GraphService
  ) { }

  public ngOnInit(): void {
    selectWithDestroyFlag(this.store, this.destroy$, getStudent).subscribe(student => {
      this.student = student;

      if (student._id) {
        const graphWrapper: HTMLElement = document.getElementById(this.selector);

        if (graphWrapper) {
          graphWrapper.innerHTML = '';
        }

        this.graphService.getStudentGraphData(student._id).subscribe(data => this.graphDrawer.draw(data, `.${this.selector}`));
      }
    });
    setDestroyFlag(this.route.params, this.destroy$).subscribe(({ id }) => this.store.dispatch(loadStudent({ id })));
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
