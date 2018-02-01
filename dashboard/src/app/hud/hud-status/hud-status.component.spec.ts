import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudStatusComponent } from './hud-status.component';

describe('HudStatusComponent', () => {
  let component: HudStatusComponent;
  let fixture: ComponentFixture<HudStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
