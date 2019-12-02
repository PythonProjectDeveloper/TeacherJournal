import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';
import { MatIconModule } from '@angular/material';
import { BannerService } from 'src/app/common/services/banner.service';
import { Observable, of } from 'rxjs';
import { SimpleMessageComponent } from './simple-message/simple-message.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BannerDirective } from 'src/app/common/directives/banner.directive';

let component: BannerComponent;
let fixture: ComponentFixture<BannerComponent>;
let data: string = 'message';

class BannerServiceStub {
  public getBannerStatus(): Observable<boolean> {
    return of(true);
  }

  public getBunner(): Observable<string> {
    return of(data);
  }

  public setBannerStatus(flag: boolean): void { }
}

function configureTestingModule(): void {
  TestBed.configureTestingModule({
    declarations: [
      BannerComponent,
      SimpleMessageComponent,
      BannerDirective
    ],
    imports: [
      MatIconModule
    ],
    providers: [
      { provide: BannerService, useClass: BannerServiceStub }
    ]
  }).overrideModule(BrowserDynamicTestingModule, {
    set: {
      entryComponents: [ SimpleMessageComponent ],
    }
  });
}

function setComponent(): void {
  fixture = TestBed.createComponent(BannerComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
}

describe('BannerComponent', () => {
  describe('#ngOnInit', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should set banner status', () => {
      component.isOpen = false;

      component.ngOnInit();

      expect(component.isOpen).toEqual(true);
    });

    it('should call loadComponent with getting data', () => {
      spyOn(component, 'loadComponent');

      component.ngOnInit();

      expect(component.loadComponent).toHaveBeenCalledWith(data);
    });
  });

  describe('#loadComponent', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should create banner and add him to dom', () => {
      component.loadComponent(data);

      fixture.detectChanges();

      const banner: any = fixture.nativeElement.querySelector('.banner');
      const message: string = banner.querySelector('p').innerText;

      expect(banner).toBeDefined();
      expect(message).toEqual(data);
    });
  });

  describe('#onClose', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should call onClose when button click', () => {
      const button: any = fixture.nativeElement.querySelector('.button');

      spyOn(component, 'onClose');

      button.dispatchEvent(new Event('click'));

      fixture.detectChanges();

      expect(component.onClose).toHaveBeenCalled();
    });

    it('should set bunner status', () => {
      const service: any = TestBed.get(BannerService);

      spyOn(service, 'setBannerStatus');

      const button: any = fixture.nativeElement.querySelector('.button');
      button.dispatchEvent(new Event('click'));

      fixture.detectChanges();

      expect(service.setBannerStatus).toHaveBeenCalledWith(false);
    });
  });
});
