import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { assembleUrl } from '../helpers/calculations';
import { JOURNALS_API_URL } from '../constants/constants-journal';
import { HttpService } from './http.service';
import { IJournalState } from '../entities/journal';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  constructor(
    private httpService: HttpService
  ) { }

  public updateJournal(journal: IJournalState): Observable<IJournalState> {
    const url: string = assembleUrl(JOURNALS_API_URL, journal._id);
    return this.httpService.put<IJournalState>(url, journal);
  }

  public getJournal(id: string): Observable<IJournalState> {
    const url: string = assembleUrl(JOURNALS_API_URL, id);
    return this.httpService.get<IJournalState>(url);
  }

  public getJournals(): Observable<IJournalState[]> {
    const url: string = JOURNALS_API_URL;
    return this.httpService.get<IJournalState[]>(url);
  }
}
