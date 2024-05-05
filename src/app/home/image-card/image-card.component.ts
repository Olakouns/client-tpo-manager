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
    title: "Simplicité d'Abonnement",
    description: "Facilitez la vie de vos utilisateurs avec une gestion aisée des abonnés pour une expérience téléphonique sans soucis !"
  },
  {
    id: 2,
    image: "slide-2.png",
    title: "Fluidité Financière",
    description: "Simplifiez la facturation pour une gestion financière en toute simplicité et tranquillité d'esprit"
  },
  {
    id: 3,
    image: "slide-3.png",
    title: "Analyse Téléphonique Agile",
    description: "Simplifiez la gestion des CDR pour une visibilité téléphonique optimale, permettant une analyse fluide des activités d'appels."
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
