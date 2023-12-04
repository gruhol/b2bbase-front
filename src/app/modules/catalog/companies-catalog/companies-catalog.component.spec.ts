import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesCatalogComponent } from './companies-catalog.component';

describe('CompanyCatalog2Component', () => {
  let component: CompaniesCatalogComponent;
  let fixture: ComponentFixture<CompaniesCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniesCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaniesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
