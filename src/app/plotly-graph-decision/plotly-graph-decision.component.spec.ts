import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotlyGraphDecisionComponent } from './plotly-graph-decision.component';

describe('PlotlyGraphDecisionComponent', () => {
  let component: PlotlyGraphDecisionComponent;
  let fixture: ComponentFixture<PlotlyGraphDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlotlyGraphDecisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlotlyGraphDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
