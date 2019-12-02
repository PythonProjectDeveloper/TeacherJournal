import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private isOpen: Subject<boolean> = new Subject();

  constructor(
    private translate: TranslateService
  ) { }

  public getBunner(): Observable<any> {
    return this.translate.onLangChange.pipe(
      map(({ translations }) => translations.BANNER_MESSAGE)
    );
  }

  public setBannerStatus(flag: boolean): void {
    this.isOpen.next(flag);
  }

  public getBannerStatus(): Observable<boolean> {
    return this.isOpen;
  }
}
