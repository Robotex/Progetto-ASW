import { TestBed, inject } from '@angular/core/testing';

import { HudCardsServiceService } from './hud-cards-service.service';

describe('HudCardsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HudCardsServiceService]
    });
  });

  it('should be created', inject([HudCardsServiceService], (service: HudCardsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
