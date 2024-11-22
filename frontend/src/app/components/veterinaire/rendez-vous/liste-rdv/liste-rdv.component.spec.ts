import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRdvComponent } from './liste-rdv.component';

describe('ListeRdvComponent', () => {
  let component: ListeRdvComponent;
  let fixture: ComponentFixture<ListeRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeRdvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
