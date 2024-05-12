import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantManagementComponent } from './constant-management.component';

describe('ConstantManagementComponent', () => {
  let component: ConstantManagementComponent;
  let fixture: ComponentFixture<ConstantManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstantManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConstantManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
