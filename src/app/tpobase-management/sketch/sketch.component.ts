import { Component, Input } from '@angular/core';
import { Slide } from '../../payload/slide';

@Component({
  selector: 'app-sketch',
  standalone: true,
  imports: [],
  templateUrl: './sketch.component.html',
  styleUrl: './sketch.component.scss'
})
export class SketchComponent {
  @Input({required: true}) inputData : Slide;
}
