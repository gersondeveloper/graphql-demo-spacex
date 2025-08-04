import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicQueryCheckbox } from './dynamic-query-checkbox';

describe('DynamicQueryCheckbox', () => {
  let component: DynamicQueryCheckbox;
  let fixture: ComponentFixture<DynamicQueryCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicQueryCheckbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicQueryCheckbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
