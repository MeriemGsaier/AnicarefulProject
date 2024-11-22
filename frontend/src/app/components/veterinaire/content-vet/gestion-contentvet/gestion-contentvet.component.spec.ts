import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionContentvetComponent } from './gestion-contentvet.component';

describe('GestionContentvetComponent', () => {
  let component: GestionContentvetComponent;
  let fixture: ComponentFixture<GestionContentvetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionContentvetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionContentvetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
