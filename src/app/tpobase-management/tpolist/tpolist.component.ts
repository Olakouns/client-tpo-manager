import {Component} from '@angular/core';
import {SketchComponent} from "../sketch/sketch.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {TpoItemComponent} from "./tpo-item/tpo-item.component";
import { Slide } from '../../payload/slide';

@Component({
  selector: 'app-tpolist',
  standalone: true,
  imports: [SketchComponent, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatMenuModule, TpoItemComponent],
  templateUrl: './tpolist.component.html',
  styleUrl: './tpolist.component.scss'
})
export class TPOListComponent {
  slide : Slide = {
    image: "assets/tpo-slide-1.png",
    description: "\"Explorez l'avenir de vos configurations avec simplicité et précision. <br> Configurer, c'est innover!\""
  };
  
}
