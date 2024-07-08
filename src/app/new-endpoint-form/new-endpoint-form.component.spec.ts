import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEndpointFormComponent } from './new-endpoint-form.component';

describe('NewEndpointFormComponent', () => {
  let component: NewEndpointFormComponent;
  let fixture: ComponentFixture<NewEndpointFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEndpointFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEndpointFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
