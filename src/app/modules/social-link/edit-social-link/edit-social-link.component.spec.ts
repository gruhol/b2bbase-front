import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSocialLinkComponent } from './edit-social-link.component';

describe('EditSocialLinkComponent', () => {
  let component: EditSocialLinkComponent;
  let fixture: ComponentFixture<EditSocialLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSocialLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSocialLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
