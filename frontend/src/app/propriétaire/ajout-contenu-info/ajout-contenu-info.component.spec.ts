import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutContenuInfoComponent } from './ajout-contenu-info.component';

describe('AjoutContenuInfoComponent', () => {
  let component: AjoutContenuInfoComponent;
  let fixture: ComponentFixture<AjoutContenuInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutContenuInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutContenuInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
