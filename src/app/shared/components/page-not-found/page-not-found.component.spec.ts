import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

let component: PageNotFoundComponent;
let fixture: ComponentFixture<PageNotFoundComponent>;
const data: any = { imageUrl: '__url__', titleText: 'text', description: 'description' };

class MockRoute {
  public params = of({});
  public snapshot = { data };
}

function configureTestingModule(): void {
  TestBed.configureTestingModule({
    declarations: [ PageNotFoundComponent ],
    imports: [
      TranslateModule.forRoot()
    ],
    providers: [
      { provide: ActivatedRoute, useClass: MockRoute }
    ]
  })
  .compileComponents();
}

function setComponent(): void {
  fixture = TestBed.createComponent(PageNotFoundComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
}

describe('PageNotFoundComponent', () => {
  describe('#ngOnInit', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should subscribe on change url', () => {
      component.ngOnInit();

      expect(component.subscription.unsubscribe).not.toBeUndefined();
    });

    it('should set parameters', () => {
      component.ngOnInit();

      expect(component.imageUrl).toEqual(data.imageUrl);
      expect(component.titleText).toEqual(data.titleText);
      expect(component.description).toEqual(data.description);
    });
  });

  describe('#ngOnDestroy', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should unsubsribe all subscribtions', () => {
      component.ngOnInit();

      spyOn(component.subscription, 'unsubscribe');

      component.ngOnDestroy();

      expect(component.subscription.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('#markup', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should show a block if do not have some data', () => {
      const image: any = fixture.nativeElement.querySelector('.image');
      const h2: any = fixture.nativeElement.querySelector('.title');
      const description: any = fixture.nativeElement.querySelector('.description');

      expect(image).not.toBeNull();
      expect(h2).not.toBeNull();
      expect(description).not.toBeNull();
    });

    it('should not show a block if do not have some data for him', () => {
      component.imageUrl = undefined;
      component.titleText = undefined;
      component.description = undefined;

      fixture.detectChanges();

      const image: any = fixture.nativeElement.querySelector('.image');
      const h2: any = fixture.nativeElement.querySelector('.title');
      const description: any = fixture.nativeElement.querySelector('.description');

      expect(image).toBeNull();
      expect(h2).toBeNull();
      expect(description).toBeNull();
    });

    it('should set parameters', () => {
      const image: any = fixture.nativeElement.querySelector('.image');
      const h2: any = fixture.nativeElement.querySelector('.title');
      const description: any = fixture.nativeElement.querySelector('.description');

      expect(image.src.endsWith(data.imageUrl)).toEqual(true);
      expect(h2.innerText).toEqual('PAGE_NOT_FOUND.titleText.text');
      expect(description.innerText).toEqual('PAGE_NOT_FOUND.description');
    });
  });
});
