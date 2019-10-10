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

  public saveJournal(journal: Journal): Observable<Journal> {
    const url: string = assembleUrl(JOURNALS_API_URL, journal.subjectId);
    return this.httpService.put<Journal>(url, journal, new Journal());
  }

  public getJournal(subjectId: string): Observable<Journal> {
    const url: string = assembleUrl(JOURNALS_API_URL, subjectId);
    return this.httpService.get<Journal>(url, new Journal());
  }
}
