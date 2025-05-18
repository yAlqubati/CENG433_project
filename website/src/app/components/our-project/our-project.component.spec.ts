import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurProjectComponent } from './our-project.component';

describe('OurProjectComponent', () => {
  let component: OurProjectComponent;
  let fixture: ComponentFixture<OurProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
