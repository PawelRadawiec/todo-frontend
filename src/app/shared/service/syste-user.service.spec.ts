import { TestBed } from '@angular/core/testing';

import { SysteUserService } from './syste-user.service';

describe('SysteUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysteUserService = TestBed.get(SysteUserService);
    expect(service).toBeTruthy();
  });
});
