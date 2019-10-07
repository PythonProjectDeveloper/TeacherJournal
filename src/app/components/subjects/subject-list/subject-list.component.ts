import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/common/services/subject.service';
import { Subject } from 'src/app/common/models/subject';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {
  subjects: Subject[];

  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.subjectService.getSubjects()
      .subscribe(students => {
        this.subjects = students;
      });
  }

  onDelete(subject: Subject) {
    this.subjectService.delete(subject);
  }

}
