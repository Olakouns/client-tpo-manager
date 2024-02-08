import {Component} from '@angular/core';
import {SketchComponent} from "../sketch/sketch.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {TpoItemComponent} from "./tpo-item/tpo-item.component";

@Component({
  selector: 'app-tpolist',
  standalone: true,
  imports: [SketchComponent, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatMenuModule, TpoItemComponent],
  templateUrl: './tpolist.component.html',
  styleUrl: './tpolist.component.scss'
})
export class TPOListComponent {

}
