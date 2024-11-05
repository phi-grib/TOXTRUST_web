import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotlyGraphComponent } from './plotly-graph.component';

describe('PlotlyGraphComponent', () => {
  let component: PlotlyGraphComponent;
  let fixture: ComponentFixture<PlotlyGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlotlyGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlotlyGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
