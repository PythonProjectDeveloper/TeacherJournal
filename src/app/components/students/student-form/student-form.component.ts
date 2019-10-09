import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/common/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentCanDeactivate } from 'src/app/common/guards/exit-about.guard';
import { Observable } from 'rxjs';
import { Person } from 'src/app/common/models/person';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements ComponentCanDeactivate, OnInit {
  public storedPerson: Person;
  public formPerson: Person;

  constructor(public studentService: StudentService, public route: ActivatedRoute, private router: Router) {
    this.setPersons = this.setPersons.bind(this);
  }

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.studentService.getStudent(params.id).subscribe(this.setPersons);
    });
  }

  public canDeactivate(): boolean | Observable<boolean> {
    return this.formPerson.isEqual(this.storedPerson);
  }

  public onSave(): void {
    if (!this.formPerson.firstName || !this.formPerson.lastName) { return; }

    if (this.formPerson.id) {
      this.studentService.updateStudent(this.formPerson).subscribe(this.setPersons);
    } else {
      this.studentService.createStudent(this.formPerson).subscribe(this.setPersons);
      this.router.navigate(['students', 'student', 'edit', this.formPerson.id]);
    }
  }

  public setPersons(storagePerson: Person): void {
    this.formPerson = storagePerson.getCopy();
    this.storedPerson = storagePerson;
  }

}
