import { Component } from '@angular/core';
import { XmlEditorComponent } from '../xml-editor/xml-editor.component';
import {ImageCardComponent} from "../image-card/image-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [XmlEditorComponent, ImageCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
