import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudPressureComponent } from './hud-pressure.component';

describe('HudPressureComponent', () => {
  let component: HudPressureComponent;
  let fixture: ComponentFixture<HudPressureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudPressureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudPressureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
