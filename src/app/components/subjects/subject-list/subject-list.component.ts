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

  constructor(private subjectService: SubjectService) {
    this.setSubjects = this.setSubjects.bind(this);
  }

  ngOnInit() {
    this.subjectService.getSubjects().subscribe(this.setSubjects);
  }

  onDelete(subject: Subject) {
    this.subjectService.deleteSubject(subject).subscribe(this.setSubjects);
  }

  setSubjects(subjects: Subject[]) {
    this.subjects = subjects;
  }

}
