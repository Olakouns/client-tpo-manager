import { NgClass } from '@angular/common';
import { AfterContentInit, Component, NgZone, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss'
})
export class ImageCardComponent implements OnInit, OnDestroy {
  slides = [{
    id: 1,
    image: "slide-1.png",
    title: "Simplified configuration",
    description: "Customize your TPOs in just a few clicks with our intuitive interface."
  },
  {
    id: 2,
    image: "slide-2.png",
    title: "Centralized Management",
    description: "Control all your TPOs from one place, for efficient and hassle-free management."
  },
  {
    id: 3,
    image: "slide-3.png",
    title: "Advanced Customization",
    description: "Tailor your TPOs to your specific needs with our advanced customization options."
  }]
  currentSlide = this.slides[0];

  id: any;
  constructor(private ngZone: NgZone) { }
  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => setInterval(() => {
      const currentIndex = this.slides.indexOf(this.currentSlide);
      this.ngZone.run(() => {
        if (currentIndex < this.slides.length - 1) {
          this.currentSlide = this.slides[currentIndex + 1];
        } else {
          this.currentSlide = this.slides[0];
        }
      });
    }, 5000));
  }

  ngOnDestroy(): void {
    if (this.id) {
      clearInterval(this.id);
    }
  }

}
