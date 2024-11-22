import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoGardienComponent } from './info-gardien.component';

describe('InfoGardienComponent', () => {
  let component: InfoGardienComponent;
  let fixture: ComponentFixture<InfoGardienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoGardienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoGardienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
