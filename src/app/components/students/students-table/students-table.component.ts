import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { students } from 'src/app/common/constants/constants-person';
import { StudentService } from 'src/app/common/services/student.service';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent implements OnInit {
  students = students;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'address', 'description', 'controls'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public studentService: StudentService) { }

  ngOnInit() {
    this.dataSource.data = this.students;
    this.dataSource.sort = this.sort;

    this.students = this.studentService.getStudents();
  }
}
