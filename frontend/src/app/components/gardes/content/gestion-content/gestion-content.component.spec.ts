import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionContentComponent } from './gestion-content.component';

describe('GestionContentComponent', () => {
  let component: GestionContentComponent;
  let fixture: ComponentFixture<GestionContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
