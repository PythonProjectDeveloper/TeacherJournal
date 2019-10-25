import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveGuardModalWindowService {
  private answer: Subject<boolean> = new Subject();
  public isOpen: Subject<boolean> = new Subject();

  public setAnswer(answer: boolean): void {
    this.isOpen.next(false);
    this.answer.next(answer);
  }

  public showModalWindow(): Observable<boolean> {
    this.isOpen.next(true);

    return this.answer;
  }

  public getModalWindowStatus(): Observable<boolean> {
    return this.isOpen;
  }

}
