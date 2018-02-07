import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudGyroscopeComponent } from './hud-gyroscope.component';

describe('HudGyroscopeComponent', () => {
  let component: HudGyroscopeComponent;
  let fixture: ComponentFixture<HudGyroscopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudGyroscopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudGyroscopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
