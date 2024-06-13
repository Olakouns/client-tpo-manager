import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFailureTpoComponent } from './add-failure-tpo.component';

describe('AddFailureTpoComponent', () => {
  let component: AddFailureTpoComponent;
  let fixture: ComponentFixture<AddFailureTpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFailureTpoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFailureTpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
