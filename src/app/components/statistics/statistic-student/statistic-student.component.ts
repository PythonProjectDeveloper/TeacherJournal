import { Component, OnInit, Input } from '@angular/core';
import { Person } from 'src/app/common/models/person';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/common/services/student.service';

@Component({
  selector: 'app-statistic-student',
  templateUrl: './statistic-student.component.html',
  styleUrls: ['./statistic-student.component.scss']
})
export class StatisticStudentComponent implements OnInit {
  public student: Person;

  constructor(public studentService: StudentService, public route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.studentService.getStudent(params.id).subscribe(student => this.student = student);
    });
  }

}
