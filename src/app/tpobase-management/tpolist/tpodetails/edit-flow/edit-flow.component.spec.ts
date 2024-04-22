import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFlowComponent } from './edit-flow.component';

describe('EditFlowComponent', () => {
  let component: EditFlowComponent;
  let fixture: ComponentFixture<EditFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFlowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
