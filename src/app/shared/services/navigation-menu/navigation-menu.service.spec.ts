import { TestBed } from '@angular/core/testing';

import { NavigationMenuService } from './navigation-menu.service';

describe('NavigationMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavigationMenuService = TestBed.get(NavigationMenuService);
    expect(service).toBeTruthy();
  });
});
