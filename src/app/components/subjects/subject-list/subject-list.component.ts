import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/common/services/subject.service';
import { Subject } from 'src/app/common/models/subject';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {
  public subjects: Subject[];

  constructor(private subjectService: SubjectService) {
    this.setSubjects = this.setSubjects.bind(this);
  }

  public ngOnInit(): void {
    this.subjectService.getSubjects().subscribe(this.setSubjects);
  }

  public onDelete(subject: Subject): void {
    this.subjectService.deleteSubject(subject).subscribe(this.setSubjects);
  }

  public setSubjects(subjects: Subject[]): void {
    this.subjects = subjects;
  }

  public onToolbarValueChanged(searchText: string): void {
    this.subjectService.getSubjects(searchText).subscribe(this.setSubjects);
  }

}
