import { TestBed } from '@angular/core/testing';

import { PromptupdateServiceService } from './promptupdate-service.service';

describe('PromptupdateServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromptupdateServiceService = TestBed.get(PromptupdateServiceService);
    expect(service).toBeTruthy();
  });
});
