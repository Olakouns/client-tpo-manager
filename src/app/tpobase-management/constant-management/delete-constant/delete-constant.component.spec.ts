import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConstantComponent } from './delete-constant.component';

describe('DeleteConstantComponent', () => {
  let component: DeleteConstantComponent;
  let fixture: ComponentFixture<DeleteConstantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteConstantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteConstantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
