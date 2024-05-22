import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderItemComponent } from './work-order-item.component';

describe('WorkOrderItemComponent', () => {
  let component: WorkOrderItemComponent;
  let fixture: ComponentFixture<WorkOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkOrderItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
