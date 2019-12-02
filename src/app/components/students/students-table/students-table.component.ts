import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { BASE_STUDENT_COLUMNS } from 'src/app/common/constants/constants-table';
import { Store } from '@ngrx/store';
import { IGlobalState } from 'src/app/redux/reducers';
import { deleteStudent, updateFilterData } from 'src/app/redux/actions/students';
import { getStudents } from 'src/app/redux/selectors/students';
import { IPersonState } from 'src/app/common/entities/person';
import { EventDestroyer } from 'src/app/shared/entities/event-destroyer';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent extends EventDestroyer implements OnInit {
  public displayedColumns: string[] = BASE_STUDENT_COLUMNS;
  public dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort, {static: true}) public sort: MatSort;

  constructor(
    private store: Store<IGlobalState>
  ) {
    super();
  }

  public ngOnInit(): void {
    this.selectWithDestroyFlag(this.store, getStudents).subscribe((students) => this.dataSource.data = students);

    this.dataSource.sort = this.sort;
    this.store.dispatch(updateFilterData({ filterData: '' }));
  }

  public onDelete(student: IPersonState): void {
    this.store.dispatch(deleteStudent(student));
  }

  public onToolbarValueChanged(filterData: string): void {
    this.store.dispatch(updateFilterData({ filterData }));
  }
}
