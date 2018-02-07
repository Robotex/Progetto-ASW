import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudAccelerometerComponent } from './hud-accelerometer.component';

describe('HudAccelerometerComponent', () => {
  let component: HudAccelerometerComponent;
  let fixture: ComponentFixture<HudAccelerometerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudAccelerometerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudAccelerometerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
