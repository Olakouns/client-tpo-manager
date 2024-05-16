import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFailureStepWkComponent } from './edit-failure-step-wk.component';

describe('EditFailureStepWkComponent', () => {
  let component: EditFailureStepWkComponent;
  let fixture: ComponentFixture<EditFailureStepWkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFailureStepWkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditFailureStepWkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
