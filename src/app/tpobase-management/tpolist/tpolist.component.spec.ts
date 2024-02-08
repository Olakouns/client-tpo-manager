import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TPOListComponent } from './tpolist.component';

describe('TPOListComponent', () => {
  let component: TPOListComponent;
  let fixture: ComponentFixture<TPOListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TPOListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TPOListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
