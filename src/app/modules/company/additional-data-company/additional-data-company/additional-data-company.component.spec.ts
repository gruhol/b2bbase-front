import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalDataCompanyComponent } from './additional-data-company.component';

describe('AdditionalDataCompanyComponent', () => {
  let component: AdditionalDataCompanyComponent;
  let fixture: ComponentFixture<AdditionalDataCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalDataCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalDataCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
