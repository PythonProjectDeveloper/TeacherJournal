import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { getStudent } from 'src/app/redux/selectors/students';
import { loadStudent } from 'src/app/redux/actions/students';
import { GraphService } from 'src/app/common/services/graph.service';
import { StudentGraphDrawer } from 'src/app/common/helpers/draph-drawers';
import { IPerson } from 'src/app/common/entities/person';
import { EventDestroyer } from 'src/app/shared/entities/event-destroyer';

@Component({
  selector: 'app-statistic-student',
  templateUrl: './statistic-student.component.html',
  styleUrls: ['./statistic-student.component.scss']
})
export class StatisticStudentComponent extends EventDestroyer implements OnInit {
  public student: IPerson;
  public graphDrawer = new StudentGraphDrawer();
  public selector = 'graph';

  constructor(
    private store: Store<IGlobalState>,
    private route: ActivatedRoute,
    private graphService: GraphService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.selectWithDestroyFlag(this.store, getStudent).subscribe(student => {
      this.student = student;

      if (student._id) {
        const graphWrapper: HTMLElement = document.getElementById(this.selector);

        if (graphWrapper) {
          graphWrapper.innerHTML = '';
        }

        this.graphService.getStudentGraphData(student._id).subscribe(data => this.graphDrawer.draw(data, `.${this.selector}`));
      }
    });
    this.setDestroyFlag(this.route.params).subscribe(({ id }) => this.store.dispatch(loadStudent({ id })));
  }
}
