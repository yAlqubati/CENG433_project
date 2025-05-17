import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EclipsePurpleComponent } from './eclipse-purple.component';

describe('EclipsePurpleComponent', () => {
  let component: EclipsePurpleComponent;
  let fixture: ComponentFixture<EclipsePurpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EclipsePurpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EclipsePurpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
