import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TPODetailsComponent } from './tpodetails.component';

describe('TPODetailsComponent', () => {
  let component: TPODetailsComponent;
  let fixture: ComponentFixture<TPODetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TPODetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TPODetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
