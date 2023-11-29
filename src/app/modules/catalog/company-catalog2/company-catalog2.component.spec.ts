import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCatalog2Component } from './company-catalog2.component';

describe('CompanyCatalog2Component', () => {
  let component: CompanyCatalog2Component;
  let fixture: ComponentFixture<CompanyCatalog2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyCatalog2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyCatalog2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
