import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudProximityComponent } from './hud-proximity.component';

describe('HudProximityComponent', () => {
  let component: HudProximityComponent;
  let fixture: ComponentFixture<HudProximityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudProximityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudProximityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
