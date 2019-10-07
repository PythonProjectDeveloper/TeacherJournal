import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { StudentService } from 'src/app/common/services/student.service';
import { Person } from 'src/app/common/models/person';
import { baseStudentColumn } from 'src/app/shared/constants/constants-table';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent implements OnInit {
  displayedColumns: string[] = baseStudentColumn;
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this.studentService.getStudents()
      .subscribe(students => {
        this.dataSource.data = students;
      });
  }

  onDelete(student: Person) {
    this.studentService.deleteStudent(student);
  }

}
