import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifieAnimalComponent } from './modifie-animal.component';

describe('ModifieAnimalComponent', () => {
  let component: ModifieAnimalComponent;
  let fixture: ComponentFixture<ModifieAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifieAnimalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifieAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
