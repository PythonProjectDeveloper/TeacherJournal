import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent, MatButtonToggleChange } from '@angular/material';
import { Observable } from 'rxjs';
import { ISubject } from 'src/app/common/entities/subject';
import { IStudent } from 'src/app/common/entities/person';
import { select, Store } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { getStudents } from 'src/app/redux/selectors/students';
import { getSubjects } from 'src/app/redux/selectors/subjects';
import { loadStudents } from 'src/app/redux/actions/students';
import { loadSubjects } from 'src/app/redux/actions/subjects';

enum List {
  Students = 'Students',
  Subjects = 'Subjects'
}

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss']
})
export class StatisticPageComponent implements OnInit {
  public currentList = 'Students';
  public currentObject: IStudent | ISubject | null = null;
  public list = List;
  public students$: Observable<IStudent[]>;
  public subjects$: Observable<ISubject[]>;

  constructor(
    private store: Store<IGlobalState>
  ) { }

  public ngOnInit(): void {
    this.students$ = this.store.pipe(select(getStudents));
    this.subjects$ = this.store.pipe(select(getSubjects));

    this.store.dispatch(loadStudents());
    this.store.dispatch(loadSubjects());
  }

  public setCurrentList(event: MatTabChangeEvent): void {
    this.currentList = event.tab.textLabel;
    this.currentObject = null;
  }

  public setCurrentObjectId(event: MatButtonToggleChange): void {
    this.currentObject = event.value;
  }

}
