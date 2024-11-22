import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuVeterinaireComponent } from './side-menu-veterinaire.component';

describe('SideMenuVeterinaireComponent', () => {
  let component: SideMenuVeterinaireComponent;
  let fixture: ComponentFixture<SideMenuVeterinaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMenuVeterinaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuVeterinaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
