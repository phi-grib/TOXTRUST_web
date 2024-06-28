import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineEndpointComponent } from './define-endpoint.component';

describe('DefineEndpointComponent', () => {
  let component: DefineEndpointComponent;
  let fixture: ComponentFixture<DefineEndpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefineEndpointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefineEndpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
