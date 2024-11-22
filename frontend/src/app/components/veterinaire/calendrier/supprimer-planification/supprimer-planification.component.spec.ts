import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerPlanificationComponent } from './supprimer-planification.component';

describe('SupprimerPlanificationComponent', () => {
  let component: SupprimerPlanificationComponent;
  let fixture: ComponentFixture<SupprimerPlanificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupprimerPlanificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerPlanificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
