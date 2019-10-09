import { Injectable } from '@angular/core';
import { Journal } from '../models/journal';
import * as _ from 'lodash';
import { journals } from '../constants/constants-journal';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  private journals: Journal[] = [];

  constructor() {
    this.journals = _.map(journals, (journal: Journal) =>
      new Journal(
        journal.subjectId,
        journal.dayNames,
        journal.studentMarks
      )
    );
  }

  public saveJournal(journal: Journal): Observable<Journal> {
    const index: number = _.findIndex(this.journals, { subjectId: journal.subjectId });
    this.journals.splice(index, 1, journal);

    return of(journal);
  }

  public getJournal(subjectId: string): Observable<Journal> {
    const journal: Journal =  _.find(this.journals, { subjectId });

    return of(journal);
  }
}
