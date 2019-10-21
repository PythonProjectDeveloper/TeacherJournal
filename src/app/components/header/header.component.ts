import { Component, OnInit } from '@angular/core';
import { MAIN_MENU } from 'src/app/common/constants/constants-menu';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { MatButtonToggleChange } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public mainMenu = MAIN_MENU;

  constructor(
    private titleService: Title,
    private translate: TranslateService
  ) {
    translate.onLangChange.subscribe(() => {
      translate.get('title').subscribe((res: string) => {
        titleService.setTitle(res);
      });
    });
  }
  public ngOnInit(): void {
    const lang: string = navigator.language.substring(0, 2);
    this.translate.use(lang);
  }

  public useLanguage(event: MatButtonToggleChange): void {
    this.translate.use(event.value);
  }
}
