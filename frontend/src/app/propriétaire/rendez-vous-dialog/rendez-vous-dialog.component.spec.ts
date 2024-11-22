import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousDialogComponent } from './rendez-vous-dialog.component';

describe('RendezVousDialogComponent', () => {
  let component: RendezVousDialogComponent;
  let fixture: ComponentFixture<RendezVousDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RendezVousDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RendezVousDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
