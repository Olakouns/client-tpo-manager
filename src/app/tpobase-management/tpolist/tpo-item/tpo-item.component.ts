import {Component, Input} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {TPOData} from "../../../models/tpodata";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-tpo-item',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatMenuModule,
    NgIf
  ],
  templateUrl: './tpo-item.component.html',
  styleUrl: './tpo-item.component.scss'
})
export class TpoItemComponent {
  @Input({required: true}) tpo : TPOData

  constructor() {
  }
}
