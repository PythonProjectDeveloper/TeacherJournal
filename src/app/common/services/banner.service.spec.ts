import { BannerService } from './banner.service';
import { Observable, of } from 'rxjs';

describe('BannerService', () => {
  let service: BannerService;
  const localeDictionary: any = { translations: { BANNER_MESSAGE: 'banner' } };
  const translateService: any = { onLangChange: of(localeDictionary) };

  describe('#getBunner', () => {
    beforeEach(() => service = new BannerService(translateService));

    it('should return observable banner', () => {
      service.getBunner().subscribe( banner =>
        expect(banner).toEqual(localeDictionary.translations.BANNER_MESSAGE)
      );
    });
  });

  describe('#setBannerStatus', () => {
    beforeEach(() => service = new BannerService(translateService));

    it('should change state of banner', () => {
      service.getBannerStatus().subscribe( status =>
        expect(status).toEqual(false)
      );

      service.setBannerStatus(false);
    });
  });

  describe('#getBannerStatus', () => {
    beforeEach(() => service = new BannerService(translateService));

    it('should return observable state of banner', () => {
      const modalWindowStatus$: Observable<boolean> = service.getBannerStatus();

      expect(modalWindowStatus$ instanceof Observable).toEqual(true);
    });
  });
});
