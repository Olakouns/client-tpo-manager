import { Component } from '@angular/core';
import { SketchComponent } from '../../sketch/sketch.component';
import { Slide } from '../../../payload/slide';

@Component({
  selector: 'app-tpodetails',
  standalone: true,
  imports: [SketchComponent],
  templateUrl: './tpodetails.component.html',
  styleUrl: './tpodetails.component.scss'
})
export class TPODetailsComponent {
  slide : Slide = {
    image: "assets/tpo-slide-1.png",
    description: "\"Explorez l'avenir de vos configurations avec simplicité et précision. <br> Configurer, c'est innover!\""
  };
}
