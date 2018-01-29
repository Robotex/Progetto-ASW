import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudCardSpawnerComponentComponent } from './hud-card-spawner-component.component';

describe('HudCardSpawnerComponentComponent', () => {
  let component: HudCardSpawnerComponentComponent;
  let fixture: ComponentFixture<HudCardSpawnerComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudCardSpawnerComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudCardSpawnerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
