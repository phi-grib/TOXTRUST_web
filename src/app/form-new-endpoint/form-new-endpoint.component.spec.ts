import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewEndpointComponent } from './form-new-endpoint.component';

describe('FormNewEndpointComponent', () => {
  let component: FormNewEndpointComponent;
  let fixture: ComponentFixture<FormNewEndpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNewEndpointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNewEndpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
