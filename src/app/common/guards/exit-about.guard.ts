import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate } from '@angular/router';

export interface ComponentCanDeactivate{
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class ExitAboutGuard implements CanDeactivate<ComponentCanDeactivate>{

  canDeactivate(component: ComponentCanDeactivate) : Observable<boolean> | boolean{
      const isDeactivated = component.canDeactivate ? component.canDeactivate() : true;
      return isDeactivated || confirm("Вы хотите покинуть страницу без сохранения данных?");
  }

}
