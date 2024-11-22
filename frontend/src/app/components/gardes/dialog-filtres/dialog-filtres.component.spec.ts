import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFiltresComponent } from './dialog-filtres.component';

describe('DialogFiltresComponent', () => {
  let component: DialogFiltresComponent;
  let fixture: ComponentFixture<DialogFiltresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFiltresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFiltresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
