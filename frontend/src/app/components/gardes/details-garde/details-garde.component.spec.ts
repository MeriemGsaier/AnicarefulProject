import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGardeComponent } from './details-garde.component';

describe('DetailsGardeComponent', () => {
  let component: DetailsGardeComponent;
  let fixture: ComponentFixture<DetailsGardeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsGardeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsGardeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
