import { TestBed } from '@angular/core/testing';

import { SomeService } from './some.service';
import { HttpClient } from 'selenium-webdriver/http';

// Straight Jasmine testing without Angular's testing support
describe('SomeService', () => {
  let service: SomeService;
  beforeEach(() => { service = new SomeService(); });

  it('#getValue should return real value', () => {
    expect(service.getValue()).toBe('real value');
  });

  it('#getPromiseValue should return value from a promise', (done: DoneFn) => {
    service.getPromiseValue().then(value => {
      expect(value).toBe('promise');
      done();
    });
  });
});
