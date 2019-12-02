import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { deleteSubject, updateFilterData } from 'src/app/redux/actions/subjects';
import { getSubjects } from 'src/app/redux/selectors/subjects';
import { ISubjectState } from 'src/app/common/entities/subject';
import { EventDestroyer } from 'src/app/shared/entities/event-destroyer';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent extends EventDestroyer implements OnInit {
  public subjects: ISubjectState[];

  constructor(
    private store: Store<IGlobalState>
  ) {
    super();
  }

  public ngOnInit(): void {
    this.selectWithDestroyFlag(this.store, getSubjects).subscribe((subjects) => this.subjects = subjects);

    this.store.dispatch(updateFilterData({ filterData: '' }));
  }

  public onDelete(subject: ISubjectState): void {
    this.store.dispatch(deleteSubject(subject));
  }

  public onToolbarValueChanged(filterData: string): void {
    this.store.dispatch(updateFilterData({ filterData }));
  }

}
