import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudLightComponent } from './hud-light.component';

describe('HudLightComponent', () => {
  let component: HudLightComponent;
  let fixture: ComponentFixture<HudLightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudLightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
