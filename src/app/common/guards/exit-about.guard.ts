import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate } from '@angular/router';
import { LeaveGuardModalWindowService } from '../services/leave-guard-modal-window.service';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class ExitAboutGuard implements CanDeactivate<ComponentCanDeactivate> {

  constructor(
    private leaveGuardModalWindowService: LeaveGuardModalWindowService
  ) { }

  // public canDeactivate(component: ComponentCanDeactivate): Observable<boolean> | boolean {
  //     const isDeactivated: Observable<boolean> | boolean = component.canDeactivate ? component.canDeactivate() : true;
  //     return isDeactivated || confirm('Вы хотите покинуть страницу без сохранения данных?');
  // }

  public canDeactivate(component: ComponentCanDeactivate): Observable<boolean> | boolean {
    const isDeactivated: Observable<boolean> | boolean = component.canDeactivate ? component.canDeactivate() : true;
    return isDeactivated || this.leaveGuardModalWindowService.showModalWindow();
}

}
