import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTpoComponent } from './edit-tpo.component';

describe('EditTpoComponent', () => {
  let component: EditTpoComponent;
  let fixture: ComponentFixture<EditTpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTpoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
