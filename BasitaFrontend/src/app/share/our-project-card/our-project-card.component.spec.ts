import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurProjectCardComponent } from './our-project-card.component';

describe('OurProjectCardComponent', () => {
  let component: OurProjectCardComponent;
  let fixture: ComponentFixture<OurProjectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurProjectCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurProjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
