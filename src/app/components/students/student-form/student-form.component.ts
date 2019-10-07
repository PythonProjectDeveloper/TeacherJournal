import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/common/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentCanDeactivate } from 'src/app/common/guards/exit-about.guard';
import { Observable } from "rxjs";
import { Person } from 'src/app/common/models/person';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements ComponentCanDeactivate, OnInit {
  storedPerson: Person;
  formPerson: Person;

  constructor(public studentService: StudentService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const person = this.studentService.getStudent(params.id);

      this.setPersons(person);
    });
  }

  canDeactivate(): boolean | Observable<boolean> {
    return this.formPerson.isEqual(this.storedPerson);
  }

  onSave() {
    if (!this.formPerson.firstName || !this.formPerson.lastName) return;

    if (this.formPerson.id) this.studentService.updateStudent(this.formPerson);
    else {
      this.studentService.createStudent(this.formPerson);
      this.router.navigate(['/student', 'edit', this.formPerson.id]);
    }

    this.setPersons(this.formPerson);
  }

  setPersons(storagePerson: Person) {
    this.formPerson = storagePerson.getCopy();
    this.storedPerson = storagePerson;
  }

}
