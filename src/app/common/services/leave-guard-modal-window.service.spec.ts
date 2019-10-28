import { LeaveGuardModalWindowService } from './leave-guard-modal-window.service';
import { Observable } from 'rxjs';

describe('LeaveGuardModalWindowService', () => {
  let service: LeaveGuardModalWindowService;

  describe('#setAnswere', () => {
    beforeEach(() => service = new LeaveGuardModalWindowService());

    it('should emit user input to subsribers', () => {
      service.showModalWindow().subscribe( status =>
        expect(status).toEqual(true)
      );

      service.setAnswer(true);
    });

    it('should close modal window', () => {
      service.getModalWindowStatus().subscribe( status =>
        expect(status).toEqual(false)
      );

      service.setAnswer(true);
    });
  });

  describe('#showModalWindow', () => {
    beforeEach(() => service = new LeaveGuardModalWindowService());

    it('should change state of window', () => {
      service.getModalWindowStatus().subscribe( status =>
        expect(status).toEqual(false)
      );

      service.setAnswer(true);
    });

    it('should return observable state of user input', () => {
      const modalWindowResult$: Observable<boolean> = service.showModalWindow();

      expect(modalWindowResult$ instanceof Observable).toEqual(true);

      service.showModalWindow().subscribe( status =>
        expect(status).toEqual(true)
      );

      service.setAnswer(true);
    });
  });

  describe('#getModalWindowStatus', () => {
    beforeEach(() => service = new LeaveGuardModalWindowService());

    it('should return observable state of modal window', () => {
      const modalWindowStatus$: Observable<boolean> = service.getModalWindowStatus();

      expect(modalWindowStatus$ instanceof Observable).toEqual(true);

      service.getModalWindowStatus().subscribe( status =>
        expect(status).toEqual(false)
      );

      service.setAnswer(true);
    });
  });
});
