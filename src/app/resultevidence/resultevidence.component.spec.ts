import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultevidenceComponent } from './resultevidence.component';

describe('ResultevidenceComponent', () => {
  let component: ResultevidenceComponent;
  let fixture: ComponentFixture<ResultevidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultevidenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultevidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
