import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConstantComponent } from './edit-constant.component';

describe('EditConstantComponent', () => {
  let component: EditConstantComponent;
  let fixture: ComponentFixture<EditConstantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditConstantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditConstantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
