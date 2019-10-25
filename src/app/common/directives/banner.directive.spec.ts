import { BannerDirective } from './banner.directive';
import { ViewContainerRef } from '@angular/core';

describe('BannerDirective', () => {
  it('should create an instance', () => {
    const directive: BannerDirective = new BannerDirective({} as ViewContainerRef);
    expect(directive).toBeTruthy();
  });
});
