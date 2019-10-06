import { Component, OnInit } from '@angular/core';
import { IStudent } from 'src/app/common/entities/person';
import { StudentService } from 'src/app/common/services/student.service';
import { ActivatedRoute } from '@angular/router';
import { ComponentCanDeactivate } from 'src/app/common/guards/exit-about.guard';
import { Observable } from "rxjs";

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements IStudent, ComponentCanDeactivate, OnInit {
  student: IStudent;

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
    return this.checkChange();
  }

  onSave() {
    if (!this.firstName || !this.lastName) return;

    const student: IStudent = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      description: this.description
    };

    if (student.id) this.studentService.update(student);
    else this.id = this.studentService.create(student);

    this.student = this.studentService.getStudent(this.id);
  }

  checkChange(): boolean {
    return this.student.firstName === this.firstName
        && this.student.lastName === this.lastName
        && this.student.address === this.address
        && this.student.description === this.description;
  }

}
