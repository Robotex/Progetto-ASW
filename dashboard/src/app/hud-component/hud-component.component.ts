import { Component, OnInit } from '@angular/core';
import { HudCardsServiceService } from '../hud-cards-service.service';
import { HudCard } from '../hud-card';

@Component({
  selector: 'app-hud-component',
  templateUrl: './hud-component.component.html',
  styleUrls: ['./hud-component.component.css']
})
export class HudComponentComponent implements OnInit {
  cards: HudCard[] = [];
  constructor( private cardsService: HudCardsServiceService) { 
    this.cardsService.cards.subscribe(cards => {
      this.cards = cards;
    })
  }

  ngOnInit() {
    this.createCards();
  }

  createCards() {
    this.cardsService.addCard(
      new HudCard(
        {
          name: {
            key: HudCard.metadata.NAME,
            value: 'test'
          },
          routerLink: {
            key: HudCard.metadata.ROUTERLINK,
            value: 'test'
          },
          color: {
            key: HudCard.metadata.COLOR,
            value: 'test'
          }
        },
        HudComponentComponent
      )
    );
  }

}
