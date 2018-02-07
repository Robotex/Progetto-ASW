import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudMapComponent } from './hud-map.component';

describe('HudMapComponent', () => {
  let component: HudMapComponent;
  let fixture: ComponentFixture<HudMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
