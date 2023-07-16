import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkveryficationComponent } from './linkveryfication.component';

describe('LinkveryficationComponent', () => {
  let component: LinkveryficationComponent;
  let fixture: ComponentFixture<LinkveryficationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkveryficationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkveryficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
