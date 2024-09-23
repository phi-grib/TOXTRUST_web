import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRuleComponent } from './select-rule.component';

describe('SelectRuleComponent', () => {
  let component: SelectRuleComponent;
  let fixture: ComponentFixture<SelectRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectRuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
