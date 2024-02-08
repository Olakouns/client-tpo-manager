import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpoItemComponent } from './tpo-item.component';

describe('TpoItemComponent', () => {
  let component: TpoItemComponent;
  let fixture: ComponentFixture<TpoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpoItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TpoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
