import { Component } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";

@Component({
  selector: 'app-tpo-item',
  standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatMenuModule
    ],
  templateUrl: './tpo-item.component.html',
  styleUrl: './tpo-item.component.scss'
})
export class TpoItemComponent {

}
