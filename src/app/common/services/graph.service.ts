import { Injectable } from '@angular/core';
import { JournalService } from './journal.service';
import { map } from 'rxjs/operators';
// import { parseJournal, parseJournals } from '../helpers/statistic-parser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  constructor(
    private journalService: JournalService,
  ) {}

  public getStudentGraphData(id: string): Observable<any> {
    return this.journalService.getJournals();
    // .pipe(map(journals => parseJournals(journals, id)));
  }

  public getSubjectGraphData(id: string): Observable<any> {
    return this.journalService.getJournal(id);
    // .pipe(map(parseJournal));
  }
}
