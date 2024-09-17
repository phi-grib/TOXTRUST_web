import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionSettingsComponent } from './decision-settings.component';

describe('DecisionSettingsComponent', () => {
  let component: DecisionSettingsComponent;
  let fixture: ComponentFixture<DecisionSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecisionSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecisionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
