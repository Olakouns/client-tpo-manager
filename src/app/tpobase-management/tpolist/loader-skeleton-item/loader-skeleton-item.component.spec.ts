import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderSkeletonItemComponent } from './loader-skeleton-item.component';

describe('LoaderSkeletonItemComponent', () => {
  let component: LoaderSkeletonItemComponent;
  let fixture: ComponentFixture<LoaderSkeletonItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderSkeletonItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoaderSkeletonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
