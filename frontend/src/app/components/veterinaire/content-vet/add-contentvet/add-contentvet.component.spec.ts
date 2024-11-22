import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContentvetComponent } from './add-contentvet.component';

describe('AddContentvetComponent', () => {
  let component: AddContentvetComponent;
  let fixture: ComponentFixture<AddContentvetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContentvetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContentvetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
