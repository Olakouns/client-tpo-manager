import { Component, Input } from '@angular/core';
import { Slide } from '../../payload/slide';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sketch',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './sketch.component.html',
  styleUrl: './sketch.component.scss'
})
export class SketchComponent {
  @Input({required: true}) inputData : Slide;
}
