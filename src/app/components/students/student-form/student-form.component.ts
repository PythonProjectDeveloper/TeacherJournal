import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/common/entities/person';
import { StudentService } from 'src/app/common/services/student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements Student, OnInit {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;

  constructor(public studentService: StudentService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let student = this.studentService.getStudent(params.id);

      this.id = student.id;
      this.firstName = student.id;
      this.lastName = student.id;
      this.address = student.id;
      this.description = student.id;
    });
  }

}
