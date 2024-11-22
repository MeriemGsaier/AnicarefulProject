import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifieGardeComponent } from './modifie-garde.component';

describe('ModifieGardeComponent', () => {
  let component: ModifieGardeComponent;
  let fixture: ComponentFixture<ModifieGardeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifieGardeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifieGardeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
