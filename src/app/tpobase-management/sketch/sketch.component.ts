import { Component, Input } from '@angular/core';
import { Slide } from '../../payload/slide';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sketch',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatButtonModule, NgIf, RouterLink],
  templateUrl: './sketch.component.html',
  styleUrl: './sketch.component.scss'
})
export class SketchComponent {
  @Input({required: true}) inputData : Slide;
  isCurrentRoute: boolean = false;

  constructor(private router: Router) {
    this.isCurrentRoute = this.router.url === "/tpo-management"; 
  }
}
