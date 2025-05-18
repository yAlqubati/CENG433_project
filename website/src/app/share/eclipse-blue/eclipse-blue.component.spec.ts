import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EclipseBlueComponent } from './eclipse-blue.component';

describe('EclipseBlueComponent', () => {
  let component: EclipseBlueComponent;
  let fixture: ComponentFixture<EclipseBlueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EclipseBlueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EclipseBlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
