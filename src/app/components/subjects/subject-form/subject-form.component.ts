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

  constructor(public subjectService: SubjectService, public route: ActivatedRoute, private router: Router) {
    this.setSubjects = this.setSubjects.bind(this);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.subjectService.getSubject(params.id).subscribe(this.setSubjects);
    });
  }

  canDeactivate(): boolean | Observable<boolean> {
    return this.formSubject.isEqual(this.storedSubject);
  }

  onSave() {
    if (!this.formSubject.name || !this.formSubject.teacherId) return;

    if (this.formSubject.id) {
      this.subjectService.updateSubject(this.formSubject).subscribe(this.setSubjects);
    } else {
      this.subjectService.createSubject(this.formSubject).subscribe(this.setSubjects);
      this.router.navigate(['subjects', 'subject', 'edit', this.formSubject.id]);
    }
  }

  setSubjects(storageSubject: Subject) {
    this.formSubject = storageSubject.getCopy();
    this.storedSubject = storageSubject;
  }
}
