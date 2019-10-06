import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/common/entities/subject';
import { SubjectService } from 'src/app/common/services/subject.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {
  subjects: Subject[];

  constructor(private subjectService: SubjectService, private router: Router) { }

  ngOnInit() {
    this.subjectService.getSubjects()
      .subscribe(students => {
        this.subjects = students;
      });
  }

  onDelete(subject: Subject) {
    this.subjectService.delete(subject);
  }

  onEdit(subject: Subject) {
    this.router.navigate(['subjects/subject/edit', subject.id]);
  }

}
