import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {TPOData} from "../../../models/tpodata";
import {NgIf} from "@angular/common";
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditTpoComponent } from '../edit-tpo/edit-tpo.component';
import { DeleteTpoComponent } from '../delete-tpo/delete-tpo.component';

@Component({
  selector: 'app-tpo-item',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    NgIf
  ],
  templateUrl: './tpo-item.component.html',
  styleUrl: './tpo-item.component.scss'
})
export class TpoItemComponent {
  @Input({required: true}) tpo : TPOData;
  @Output() onDelete : EventEmitter<TPOData> = new EventEmitter<TPOData>();

  constructor(private router : Router,  public dialog: MatDialog) {
  }

  onGoToDetails() {
    this.router.navigateByUrl(`tpo-management/${this.tpo.id}`)
  }

  onEditTpo() {    
    const dialog = this.dialog.open(EditTpoComponent, {
      width: '700px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data : JSON.parse(JSON.stringify(this.tpo))
    });

    dialog.afterClosed().subscribe({
      next: (response: TPOData) => {
        if (response) {
          this.tpo = response;
        }
      }
    })
  }
}
