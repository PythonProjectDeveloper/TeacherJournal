import { Component, OnInit } from '@angular/core';
import { ISubject } from 'src/app/common/entities/subject';
import { teachers } from 'src/app/common/constants/constants-person';
import { ComponentCanDeactivate } from 'src/app/common/guards/exit-about.guard';
import { Observable } from 'rxjs';
import { SubjectService } from 'src/app/common/services/subject.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent implements ISubject, ComponentCanDeactivate, OnInit {
  teachers = teachers;
  subject: ISubject;

  id: string;
  name: string;
  teacherId: string;
  cabinet: string;
  description: string;

  constructor(public subjectService: SubjectService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const subject = this.subjectService.getSubject(params.id)

      this.id = subject.id;
      this.name = subject.name;
      this.teacherId = subject.teacherId;
      this.cabinet = subject.cabinet;
      this.description = subject.description;

      this.subject = subject;
    });
  }

  canDeactivate(): boolean | Observable<boolean> {
    return this.checkChange();
  }

  onSave() {
    if (!this.name || !this.teacherId) return;

    const subject: ISubject = {
      id: this.id,
      name: this.name,
      teacherId: this.teacherId,
      cabinet: this.cabinet,
      description: this.description
    };

    if (subject.id) this.subjectService.update(subject);
    else this.id = this.subjectService.create(subject);

    this.subject = this.subjectService.getSubject(this.id);
  }

  checkChange(): boolean {
    return this.subject.name === this.name
        && this.subject.teacherId === this.teacherId
        && this.subject.cabinet === this.cabinet
        && this.subject.description === this.description;
  }


}
