import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenuInformatifComponent } from './contenu-informatif.component';

describe('ContenuInformatifComponent', () => {
  let component: ContenuInformatifComponent;
  let fixture: ComponentFixture<ContenuInformatifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenuInformatifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenuInformatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
