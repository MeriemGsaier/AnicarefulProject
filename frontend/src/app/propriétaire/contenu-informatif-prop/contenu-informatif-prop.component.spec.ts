import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenuInformatifPropComponent } from './contenu-informatif-prop.component';

describe('ContenuInformatifPropComponent', () => {
  let component: ContenuInformatifPropComponent;
  let fixture: ComponentFixture<ContenuInformatifPropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenuInformatifPropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenuInformatifPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
