import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/common/entities/person';
import { StudentService } from 'src/app/common/services/student.service';
import { ActivatedRoute } from '@angular/router';
import { ComponentCanDeactivate } from 'src/app/common/guards/exit-about.guard';
import { Observable } from "rxjs";

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements Student, ComponentCanDeactivate, OnInit {
  student: Student;

  id: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;

  constructor(public studentService: StudentService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const student = this.studentService.getStudent(params.id)

      this.id = student.id;
      this.firstName = student.firstName;
      this.lastName = student.lastName;
      this.address = student.address;
      this.description = student.description;

      this.student = student;
    });
  }

  canDeactivate(): boolean | Observable<boolean> {
    return true;
  }

  onSave() {
    if (!this.firstName || !this.lastName) return;

    const student: Student = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      description: this.description
    };

    if (student.id) this.studentService.update(student);
    else this.id = this.studentService.create(student);
  }

  checkChange() {
    // if (this.firstName )
  }

}
