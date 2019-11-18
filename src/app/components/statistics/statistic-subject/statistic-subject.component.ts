import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { getSubject } from 'src/app/redux/selectors/subjects';
import { loadSubject } from 'src/app/redux/actions/subjects';
import { GraphService } from 'src/app/common/services/graph.service';
import { SubjectGraphDrawer } from 'src/app/common/helpers/draph-drawers';
import { ISubject } from 'src/app/common/entities/subject';
import { EventDestroyer } from 'src/app/shared/entities/event-destroyer';

@Component({
  selector: 'app-statistic-subject',
  templateUrl: './statistic-subject.component.html',
  styleUrls: ['./statistic-subject.component.scss']
})
export class StatisticSubjectComponent extends EventDestroyer implements OnInit {
  public subject: ISubject;
  public graphDrawer = new SubjectGraphDrawer();
  public selector = 'graph';

  constructor(
    private store: Store<IGlobalState>,
    private route: ActivatedRoute,
    private graphService: GraphService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.selectWithDestroyFlag(this.store, getSubject).subscribe(subject => {
      this.subject = subject;

      if (subject._id) {
        const graphWrapper: HTMLElement = document.getElementById(this.selector);

        if (graphWrapper) {
          graphWrapper.innerHTML = '';
        }

        this.graphService.getSubjectGraphData(subject._id).subscribe(data => this.graphDrawer.draw(data, `.${this.selector}`));
      }
    });
    this.setDestroyFlag(this.route.params).subscribe(({ id }) => this.store.dispatch(loadSubject({ id })));
  }
}
