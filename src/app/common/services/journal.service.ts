import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { assembleUrl } from '../helpers/calculations';
import { JOURNALS_API_URL } from '../constants/constants-journal';
import { HttpService } from './http.service';
import { IJournal } from '../entities/journal';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  constructor(
    private httpService: HttpService
  ) { }

  public updateJournal(journal: IJournal): Observable<IJournal> {
    const url: string = assembleUrl(JOURNALS_API_URL, journal._id);
    return this.httpService.put<IJournal>(url, journal);
  }

  // TODO: change journal id to subject id
  public getJournal(id: string): Observable<IJournal> {
    const url: string = assembleUrl(JOURNALS_API_URL, id);
    return this.httpService.get<IJournal>(url);
  }

  public getJournals(): Observable<IJournal[]> {
    const url: string = JOURNALS_API_URL;
    return this.httpService.get<IJournal[]>(url);
  }
}
