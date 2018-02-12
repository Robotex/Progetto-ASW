import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudOrientationComponent } from './hud-orientation.component';

describe('HudOrientationComponent', () => {
  let component: HudOrientationComponent;
  let fixture: ComponentFixture<HudOrientationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudOrientationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudOrientationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
