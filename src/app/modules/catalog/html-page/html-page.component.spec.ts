import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlPageComponent } from './html-page.component';

describe('HtmlPageComponent', () => {
  let component: HtmlPageComponent;
  let fixture: ComponentFixture<HtmlPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HtmlPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HtmlPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
