import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HudCard } from './hud-card';

@Injectable()
export class HudCardsServiceService {

  constructor() { }

  private _cards: BehaviorSubject<HudCard[]> = new BehaviorSubject<HudCard[]>([]);

  addCard(card: HudCard): void {
    this._cards.next(this._cards.getValue().concat(card));
  }

  get cards(): BehaviorSubject<HudCard[]> {
    return this._cards;
  }

}
