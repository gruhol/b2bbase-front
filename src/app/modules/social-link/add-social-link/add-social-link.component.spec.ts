import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSocialLinkComponent } from './add-social-link.component';

describe('AddSocialLinkComponent', () => {
  let component: AddSocialLinkComponent;
  let fixture: ComponentFixture<AddSocialLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSocialLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSocialLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
