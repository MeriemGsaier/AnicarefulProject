import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiePasswordComponent } from './modifie-password.component';

describe('ModifiePasswordComponent', () => {
  let component: ModifiePasswordComponent;
  let fixture: ComponentFixture<ModifiePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifiePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
