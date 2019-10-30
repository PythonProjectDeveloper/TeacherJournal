import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject as RXJSSubject } from 'rxjs';
import { Subject } from 'src/app/common/models/subject';
import { Store } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { deleteSubject, updateFilterText } from 'src/app/redux/actions/subjects';
import { getSubjects } from 'src/app/redux/selectors/subjects';
import { selectWithDestroyFlag } from 'src/app/common/helpers/ngrx-widen';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit, OnDestroy {
  public subjects: Subject[];
  public destroy$: RXJSSubject<boolean> = new RXJSSubject<boolean>();

  constructor(
    private store: Store<IGlobalState>
  ) { }

  public ngOnInit(): void {
    selectWithDestroyFlag(this.store, this.destroy$, getSubjects).subscribe((subjects) => this.subjects = subjects);

    this.store.dispatch(updateFilterText(''));
  }

  public onDelete(subject: Subject): void {
    this.store.dispatch(deleteSubject(subject));
  }

  public onToolbarValueChanged(filterText: string): void {
    this.store.dispatch(updateFilterText({ filterText }));
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
