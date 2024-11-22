import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifieProfilComponent } from './modifie-profil.component';

describe('ModifieProfilComponent', () => {
  let component: ModifieProfilComponent;
  let fixture: ComponentFixture<ModifieProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifieProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifieProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
