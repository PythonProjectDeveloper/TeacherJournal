import { Component } from '@angular/core';
import { MAIN_MENU } from 'src/app/common/constants/constants-menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public mainMenu = MAIN_MENU;
}
