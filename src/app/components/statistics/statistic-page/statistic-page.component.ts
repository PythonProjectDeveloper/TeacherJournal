import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent, MatButtonToggleChange } from '@angular/material';
import { ISubject } from 'src/app/common/entities/subject';
import { IStudent } from 'src/app/common/entities/person';
import { SubjectService } from 'src/app/common/services/subject.service';
import { StudentService } from 'src/app/common/services/student.service';
import { Subject } from 'src/app/common/models/subject';
import { Student } from 'src/app/common/models/person';

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
  public students: Student[];
  public subjects: Subject[];

  constructor(public studentService: StudentService, public subjectService: SubjectService) { }

  public ngOnInit(): void {
    this.studentService.getStudents().subscribe((students) => this.students = students);
    this.subjectService.getSubjects().subscribe((subjects) => this.subjects = subjects);
  }

  public setCurrentList(event: MatTabChangeEvent): void {
    this.currentList = event.tab.textLabel;
    this.currentObject = null;
  }

  public setCurrentObjectId(event: MatButtonToggleChange): void {
    this.currentObject = event.value;
  }

}
