import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSystemStateComponent } from './add-system-state.component';

describe('AddSystemStateComponent', () => {
  let component: AddSystemStateComponent;
  let fixture: ComponentFixture<AddSystemStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSystemStateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSystemStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
