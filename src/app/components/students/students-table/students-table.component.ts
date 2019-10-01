import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Student } from 'src/app/common/entities/person';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent implements OnInit {
  @Input() students: Student[];

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'address', 'description'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.data = this.students;
    this.dataSource.sort = this.sort;
  }
}
