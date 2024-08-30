import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEvidencesComponent } from './list-evidences.component';

describe('ListEvidencesComponent', () => {
  let component: ListEvidencesComponent;
  let fixture: ComponentFixture<ListEvidencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEvidencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEvidencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
