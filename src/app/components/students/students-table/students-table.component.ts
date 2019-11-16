import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { BASE_STUDENT_COLUMNS } from 'src/app/shared/constants/constants-table';
import { Store } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { deleteStudent, updateFilterData } from 'src/app/redux/actions/students';
import { getStudents } from 'src/app/redux/selectors/students';
import { Subject } from 'rxjs';
import { selectWithDestroyFlag } from 'src/app/common/helpers/ngrx-widen';
import { IPerson } from 'src/app/common/entities/person';

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
    this.store.dispatch(updateFilterData({ filterData: '' }));
  }

  public onDelete(student: IPerson): void {
    this.store.dispatch(deleteStudent(student));
  }

  public onToolbarValueChanged(filterData: string): void {
    this.store.dispatch(updateFilterData({ filterData }));
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
