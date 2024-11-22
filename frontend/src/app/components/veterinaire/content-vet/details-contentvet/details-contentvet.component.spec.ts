import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsContentvetComponent } from './details-contentvet.component';

describe('DetailsContentvetComponent', () => {
  let component: DetailsContentvetComponent;
  let fixture: ComponentFixture<DetailsContentvetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsContentvetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsContentvetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
