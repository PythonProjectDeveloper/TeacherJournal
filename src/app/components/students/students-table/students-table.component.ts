import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { StudentService } from 'src/app/common/services/student.service';
import { Person } from 'src/app/common/models/person';
import { BASE_STUDENT_COLUMNS } from 'src/app/shared/constants/constants-table';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent implements OnInit {
  public displayedColumns: string[] = BASE_STUDENT_COLUMNS;
  public dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort, {static: true}) public sort: MatSort;

  constructor(private studentService: StudentService) {
    this.setTableData = this.setTableData.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  public ngOnInit(): void {
    this.dataSource.sort = this.sort;

    this.loadData();
  }

  public onDelete(student: Person): void {
    this.studentService.deleteStudent(student).subscribe(this.loadData);
  }

  public setTableData(students: Person[]): void {
    this.dataSource.data = students;
  }

  public loadData(): void {
    this.studentService.getStudents().subscribe(this.setTableData);
  }

  public onToolbarValueChanged(searchText: string): void {
    this.studentService.getStudents(searchText).subscribe(this.setTableData);
  }

}
