import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudTemperatureComponent } from './hud-temperature.component';

describe('HudTemperatureComponent', () => {
  let component: HudTemperatureComponent;
  let fixture: ComponentFixture<HudTemperatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudTemperatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
