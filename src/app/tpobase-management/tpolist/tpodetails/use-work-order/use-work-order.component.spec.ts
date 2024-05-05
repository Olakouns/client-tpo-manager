import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseWorkOrderComponent } from './use-work-order.component';

describe('UseWorkOrderComponent', () => {
  let component: UseWorkOrderComponent;
  let fixture: ComponentFixture<UseWorkOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UseWorkOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UseWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
