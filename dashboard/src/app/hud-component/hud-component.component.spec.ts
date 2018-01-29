import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudComponentComponent } from './hud-component.component';

describe('HudComponentComponent', () => {
  let component: HudComponentComponent;
  let fixture: ComponentFixture<HudComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
