import { Component, OnInit } from '@angular/core';
import { teachers } from 'src/app/common/constants/constants-person';
import { ComponentCanDeactivate } from 'src/app/common/guards/exit-about.guard';
import { Observable } from 'rxjs';
import { SubjectService } from 'src/app/common/services/subject.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/common/models/subject';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent implements ComponentCanDeactivate, OnInit {
  teachers = teachers;
  storedSubject: Subject;
  formSubject: Subject;

  constructor(public subjectService: SubjectService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const subject = this.subjectService.getSubject(params.id);

      this.setSubjects(subject);
    });
  }

  canDeactivate(): boolean | Observable<boolean> {
    return this.formSubject.isEqual(this.storedSubject);
  }

  onSave() {
    if (!this.formSubject.name || !this.formSubject.teacherId) return;

    if (this.formSubject.id) this.subjectService.updateSubject(this.formSubject);
    else {
      this.subjectService.createSubject(this.formSubject);
      this.router.navigate(['subjects', 'subject', 'edit', this.formSubject.id]);
    }

    this.setSubjects(this.formSubject);
  }

  setSubjects(storageSubject: Subject) {
    this.formSubject = storageSubject.getCopy();
    this.storedSubject = storageSubject;
  }
}
