import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMedComponent } from './info-med.component';

describe('InfoMedComponent', () => {
  let component: InfoMedComponent;
  let fixture: ComponentFixture<InfoMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoMedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
