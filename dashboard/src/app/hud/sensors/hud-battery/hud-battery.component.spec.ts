import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudBatteryComponent } from './hud-battery.component';

describe('HudBatteryComponent', () => {
  let component: HudBatteryComponent;
  let fixture: ComponentFixture<HudBatteryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudBatteryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudBatteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
