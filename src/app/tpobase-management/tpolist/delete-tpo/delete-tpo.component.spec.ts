import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTpoComponent } from './delete-tpo.component';

describe('DeleteTpoComponent', () => {
  let component: DeleteTpoComponent;
  let fixture: ComponentFixture<DeleteTpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTpoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteTpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
