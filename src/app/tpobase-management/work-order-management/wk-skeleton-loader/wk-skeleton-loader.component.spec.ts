import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WkSkeletonLoaderComponent } from './wk-skeleton-loader.component';

describe('WkSkeletonLoaderComponent', () => {
  let component: WkSkeletonLoaderComponent;
  let fixture: ComponentFixture<WkSkeletonLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WkSkeletonLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WkSkeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
