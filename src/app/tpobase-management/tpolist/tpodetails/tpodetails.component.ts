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
    description: "\"Explore the future of your configurations with simplicity and precision. <br> Configuring is innovating!\""
  };
}
