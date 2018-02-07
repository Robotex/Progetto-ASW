import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudMagneticComponent } from './hud-magnetic.component';

describe('HudMagneticComponent', () => {
  let component: HudMagneticComponent;
  let fixture: ComponentFixture<HudMagneticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudMagneticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudMagneticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
