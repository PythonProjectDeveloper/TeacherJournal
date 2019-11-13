import { TestBed } from '@angular/core/testing';

import { DownloadService } from './downloader.service';

describe('DownloaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DownloadService = TestBed.get(DownloadService);
    expect(service).toBeTruthy();
  });
});
