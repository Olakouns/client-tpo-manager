import { Component } from '@angular/core';
import { SketchComponent } from '../../sketch/sketch.component';
import { Slide } from '../../../payload/slide';
import { MatIcon } from '@angular/material/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tpodetails',
  standalone: true,
  imports: [SketchComponent, MatIcon],
  templateUrl: './tpodetails.component.html',
  styleUrl: './tpodetails.component.scss'
})
export class TPODetailsComponent {
  slide : Slide = {
    image: "assets/tpo-slide-1.png",
    description: "\" Dive into the world of your configurations with ease and accuracy. <br> Let's shape the future of configuration together!\""
  };
 
  constructor(private location: Location) {
    
  }

  onGoBack() {
    this.location.back();
  }
}
