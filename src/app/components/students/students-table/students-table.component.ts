import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Person } from 'src/app/common/models/person';
import { BASE_STUDENT_COLUMNS } from 'src/app/shared/constants/constants-table';
import { Store, select } from '@ngrx/store';
import { IReducer } from 'src/app/redux/reducers';
import { deleteStudent, loadStudents, updateFilterText } from 'src/app/redux/actions/students';
import { getStudents, getFilterText } from 'src/app/redux/selectors/students';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent implements OnInit {
  public displayedColumns: string[] = BASE_STUDENT_COLUMNS;
  public dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort, {static: true}) public sort: MatSort;

  constructor(private store: Store<IReducer>) {
    store.pipe(select(getStudents)).subscribe((students) => this.dataSource.data = students);
  }

  public ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.store.dispatch(loadStudents());
  }

  public onDelete(student: Person): void {
    this.store.dispatch(deleteStudent(student));
  }

  public onToolbarValueChanged(filterText: string): void {
    this.store.dispatch(updateFilterText({ filterText }));
  }

}
