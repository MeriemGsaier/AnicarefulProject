import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerHorraireComponent } from './supprimer-horraire.component';

describe('SupprimerHorraireComponent', () => {
  let component: SupprimerHorraireComponent;
  let fixture: ComponentFixture<SupprimerHorraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupprimerHorraireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerHorraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
