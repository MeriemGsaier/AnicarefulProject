import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsPropComponent } from './produits-prop.component';

describe('ProduitsPropComponent', () => {
  let component: ProduitsPropComponent;
  let fixture: ComponentFixture<ProduitsPropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitsPropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitsPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
