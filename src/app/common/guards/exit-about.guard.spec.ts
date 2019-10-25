import { ExitAboutGuard } from './exit-about.guard';

describe('ExitAboutGuard', () => {
  let mockComponent: any;
  let mockService: jasmine.SpyObj<any>;
  let guard: ExitAboutGuard;

  describe('#canDeactivate', () => {

    it('should show guard window when user live without saving form', () => {
      mockService = { showModalWindow: jasmine.createSpy().and.returnValue(true) };
      mockComponent = { canDeactivate: jasmine.createSpy().and.returnValue(false) };
      guard = new ExitAboutGuard(mockService);

      expect(guard.canDeactivate(mockComponent)).toEqual(true);
      expect(mockService.showModalWindow).toHaveBeenCalled();
    });

    it('should not show modal window if nothing changed', () => {
      mockService = { showModalWindow: jasmine.createSpy().and.returnValue(false) };
      mockComponent = { canDeactivate: jasmine.createSpy().and.returnValue(true) };
      guard = new ExitAboutGuard(mockService);

      expect(guard.canDeactivate(mockComponent)).toEqual(true);
      expect(mockService.showModalWindow).not.toHaveBeenCalled();
    });

    it('should work correct if component does not implement canDeactivate method', () => {
      mockService = { showModalWindow: jasmine.createSpy().and.returnValue(false) };
      mockComponent = { };
      guard = new ExitAboutGuard(mockService);

      expect(guard.canDeactivate(mockComponent)).toEqual(true);
      expect(mockService.showModalWindow).not.toHaveBeenCalled();
    });
  });
});
