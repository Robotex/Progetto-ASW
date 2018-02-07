import { TestBed, inject } from '@angular/core/testing';

import { HudDataService } from './hud-data.service';

describe('HudDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HudDataService]
    });
  });

  it('should be created', inject([HudDataService], (service: HudDataService) => {
    expect(service).toBeTruthy();
  }));
});
