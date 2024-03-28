import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@Component({
  selector: 'app-xml-editor',
  standalone: true,
  imports: [MonacoEditorModule,FormsModule],
  templateUrl: './xml-editor.component.html',
  styleUrl: './xml-editor.component.scss'
})
export class XmlEditorComponent {
  editorOptions = {theme: 'vs-dark', language: 'xml'};
  code: string= '<xml>\n  <block type="controls_if"></block>\n</xml>';
}
