import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuGardienComponent } from './side-menu-gardien.component';

describe('SideMenuGardienComponent', () => {
  let component: SideMenuGardienComponent;
  let fixture: ComponentFixture<SideMenuGardienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMenuGardienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuGardienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
