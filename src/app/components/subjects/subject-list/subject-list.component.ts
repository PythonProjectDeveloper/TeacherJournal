import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { deleteSubject, updateFilterText } from 'src/app/redux/actions/subjects';
import { getSubjects } from 'src/app/redux/selectors/subjects';
import { selectWithDestroyFlag } from 'src/app/common/helpers/ngrx-widen';
import { ISubject } from 'src/app/common/entities/subject';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit, OnDestroy {
  public subjects: ISubject[];
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store<IGlobalState>
  ) { }

  public ngOnInit(): void {
    selectWithDestroyFlag(this.store, this.destroy$, getSubjects).subscribe((subjects) => this.subjects = subjects);

    this.store.dispatch(updateFilterText(''));
  }

  public onDelete(subject: ISubject): void {
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
