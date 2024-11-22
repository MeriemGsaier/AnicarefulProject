import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeGardeComponent } from './demande-garde.component';

describe('DemandeGardeComponent', () => {
  let component: DemandeGardeComponent;
  let fixture: ComponentFixture<DemandeGardeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeGardeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeGardeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
