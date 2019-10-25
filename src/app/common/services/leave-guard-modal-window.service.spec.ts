import { TestBed } from '@angular/core/testing';

import { LeaveGuardModalWindowService } from './leave-guard-modal-window.service';

describe('LeaveGuardModalWindowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaveGuardModalWindowService = TestBed.get(LeaveGuardModalWindowService);
    expect(service).toBeTruthy();
  });
});
