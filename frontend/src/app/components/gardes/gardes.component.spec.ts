import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardesComponent } from './gardes.component';

describe('GardesComponent', () => {
  let component: GardesComponent;
  let fixture: ComponentFixture<GardesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GardesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
