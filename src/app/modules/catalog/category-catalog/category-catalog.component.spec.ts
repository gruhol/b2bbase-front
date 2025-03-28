import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCatalogComponent } from './category-catalog.component';

describe('CategoryCatalogComponent', () => {
  let component: CategoryCatalogComponent;
  let fixture: ComponentFixture<CategoryCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryCatalogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
