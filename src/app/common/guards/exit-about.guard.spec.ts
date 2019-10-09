import { TestBed, async, inject } from '@angular/core/testing';

import { ExitAboutGuard } from './exit-about.guard';

describe('ExitAboutGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExitAboutGuard]
    });
  });

  it('should ...', inject([ExitAboutGuard], (guard: ExitAboutGuard) => {
    expect(guard).toBeTruthy();
  }));
});
