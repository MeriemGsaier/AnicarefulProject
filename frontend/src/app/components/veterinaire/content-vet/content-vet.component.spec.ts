import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentVetComponent } from './content-vet.component';

describe('ContentVetComponent', () => {
  let component: ContentVetComponent;
  let fixture: ComponentFixture<ContentVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentVetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
