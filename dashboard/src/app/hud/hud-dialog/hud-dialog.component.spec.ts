import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudDialogComponent } from './hud-dialog.component';

describe('HudDialogComponent', () => {
  let component: HudDialogComponent;
  let fixture: ComponentFixture<HudDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
