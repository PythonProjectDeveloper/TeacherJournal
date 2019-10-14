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
    this.loadData = this.loadData.bind(this);
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public onDelete(subject: Subject): void {
    this.subjectService.deleteSubject(subject).subscribe(this.loadData);
  }

  public setSubjects(subjects: Subject[]): void {
    this.subjects = subjects;
  }

  public loadData(): void {
    this.subjectService.getSubjects().subscribe(this.setSubjects);
  }

  public onToolbarValueChanged(searchText: string): void {
    this.subjectService.getSubjects(searchText).subscribe(this.setSubjects);
  }

}
