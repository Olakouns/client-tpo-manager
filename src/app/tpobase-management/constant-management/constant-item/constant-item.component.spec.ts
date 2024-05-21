import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantItemComponent } from './constant-item.component';

describe('ConstantItemComponent', () => {
  let component: ConstantItemComponent;
  let fixture: ComponentFixture<ConstantItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstantItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConstantItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
