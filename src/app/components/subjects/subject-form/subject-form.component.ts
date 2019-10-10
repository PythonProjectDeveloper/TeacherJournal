import { Component, OnInit } from '@angular/core';
import { ComponentCanDeactivate } from 'src/app/common/guards/exit-about.guard';
import { Observable } from 'rxjs';
import { SubjectService } from 'src/app/common/services/subject.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/common/models/subject';
import { Teacher } from 'src/app/common/models/person';
import { TeacherService } from 'src/app/common/services/teacher.service';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent implements ComponentCanDeactivate, OnInit {
  public teachers: Teacher[];
  public storedSubject: Subject;
  public formSubject: Subject;

  constructor(
    public subjectService: SubjectService,
    public teacherService: TeacherService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    this.setSubjects = this.setSubjects.bind(this);
    this.setTeachers = this.setTeachers.bind(this);
  }

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.subjectService.getSubject(params.id).subscribe(this.setSubjects);
      this.teacherService.getTeachers().subscribe(this.setTeachers);
    });
  }

  public canDeactivate(): boolean | Observable<boolean> {
    return this.formSubject.isEqual(this.storedSubject);
  }

  public onSave(): void {
    if (!this.formSubject.name || !this.formSubject.teacherId) { return; }

    if (this.formSubject.id) {
      this.subjectService.updateSubject(this.formSubject).subscribe(this.setSubjects);
    } else {
      this.subjectService.createSubject(this.formSubject).subscribe(this.setSubjects);
      this.router.navigate(['subjects', 'subject', 'edit', this.formSubject.id]);
    }
  }

  public setSubjects(storageSubject: Subject): void {
    this.formSubject = storageSubject.getCopy();
    this.storedSubject = storageSubject;
  }

  public setTeachers(teachers: Teacher[]): void {
    this.teachers = teachers;
  }
}
