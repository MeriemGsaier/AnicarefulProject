import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropSidebarComponent } from './prop-sidebar.component';

describe('PropSidebarComponent', () => {
  let component: PropSidebarComponent;
  let fixture: ComponentFixture<PropSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
