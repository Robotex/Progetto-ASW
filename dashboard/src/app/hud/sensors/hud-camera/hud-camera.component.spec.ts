import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudCameraComponent } from './hud-camera.component';

describe('HudCameraComponent', () => {
  let component: HudCameraComponent;
  let fixture: ComponentFixture<HudCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
