import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { WIDGET_JOURNAL_DATES_API_URL } from '../constants/constants-datapicker';
import { ISubjectDates } from '../entities/subject-dates';

@Injectable({
  providedIn: 'root'
})
export class DataPickerService {
  constructor(
    private httpService: HttpService
  ) { }

  public getSubjectDates(): Observable<ISubjectDates[]> {
    const url: string = WIDGET_JOURNAL_DATES_API_URL;
    return this.httpService.get<ISubjectDates[]>(url, []);
  }
}
