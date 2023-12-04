import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCatalogComponent } from './company-catalog.component';

describe('CompanyCatalogComponent', () => {
  let component: CompanyCatalogComponent;
  let fixture: ComponentFixture<CompanyCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
