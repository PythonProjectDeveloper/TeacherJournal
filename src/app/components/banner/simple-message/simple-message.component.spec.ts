import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleMessageComponent } from './simple-message.component';

let component: SimpleMessageComponent;
let fixture: ComponentFixture<SimpleMessageComponent>;

function configureTestingModule(): void {
  TestBed.configureTestingModule({
    declarations: [ SimpleMessageComponent ]
  })
  .compileComponents();
}

function setComponent(): void {
  fixture = TestBed.createComponent(SimpleMessageComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
}

describe('SimpleMessageComponent', () => {
  describe('#markup', () => {
    beforeEach(async(configureTestingModule));
    beforeEach(setComponent);

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set parameters', () => {
      const data: string = 'some data';

      component.data = data;

      fixture.detectChanges();

      const banner: any = fixture.nativeElement.querySelector('.banner');

      expect(banner.innerText).toEqual(data);
    });
  });
});
