import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudMenuComponent } from './hud-menu.component';

describe('HudMenuComponent', () => {
  let component: HudMenuComponent;
  let fixture: ComponentFixture<HudMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
