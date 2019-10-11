import { Injectable } from '@angular/core';
import { Journal } from '../models/journal';
import { Observable } from 'rxjs';
import { assembleUrl } from '../helpers/calculations';
import { JOURNALS_API_URL } from '../constants/constants-journal';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  constructor(
    private httpService: HttpService
  ) { }

  public updateJournal(journal: Journal): Observable<Journal> {
    const url: string = assembleUrl(JOURNALS_API_URL, journal.id);
    const response$: Observable<Journal> = this.httpService.put<Journal>(url, journal, new Journal());
    return this.httpService.convertToObject<Journal>(response$, Journal);
  }

  public getJournal(id: string): Observable<Journal> {
    const url: string = assembleUrl(JOURNALS_API_URL, id);
    const response$: Observable<Journal> = this.httpService.get<Journal>(url, new Journal());
    return this.httpService.convertToObject<Journal>(response$, Journal);
  }
}
