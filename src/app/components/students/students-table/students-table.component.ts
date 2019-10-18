import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Person } from 'src/app/common/models/person';
import { BASE_STUDENT_COLUMNS } from 'src/app/shared/constants/constants-table';
import { Store } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { deleteStudent, updateFilterText } from 'src/app/redux/actions/students';
import { getStudents } from 'src/app/redux/selectors/students';
import { Subject } from 'rxjs';
import { selectWithDestroyFlag } from 'src/app/common/helpers/ngrx-widen';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = BASE_STUDENT_COLUMNS;
  public dataSource = new MatTableDataSource([]);
  public destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatSort, {static: true}) public sort: MatSort;

  constructor(
    private store: Store<IGlobalState>
  ) { }

  public ngOnInit(): void {
    selectWithDestroyFlag(this.store, this.destroy$, getStudents).subscribe((students) => this.dataSource.data = students);

    this.dataSource.sort = this.sort;
    this.store.dispatch(updateFilterText(''));
  }

  public onDelete(student: Person): void {
    this.store.dispatch(deleteStudent(student));
  }

  public onToolbarValueChanged(filterText: string): void {
    this.store.dispatch(updateFilterText({ filterText }));
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
