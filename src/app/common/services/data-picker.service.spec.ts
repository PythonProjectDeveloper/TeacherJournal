import { DataPickerService } from './data-picker.service';
import { of } from 'rxjs';

describe('DataPickerService', () => {
  describe('#getSubjectDates', () => {
    it('should return observable subject date array', () => {
      const serverData: any = [1, 2, 3];
      const httpService: any = { get: jasmine.createSpy().and.returnValue(of(serverData)) };
      let service: DataPickerService = new DataPickerService(httpService);

      service.getSubjectDates().subscribe(data => {
        expect(data).toEqual(serverData);
      });

      expect(httpService.get).toHaveBeenCalled();
    });
  });
});
