import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TPOData} from "../../../models/tpodata";
import {ConstantConfig} from "../../../models/constant-config";
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { EditConstantComponent } from '../edit-constant/edit-constant.component';

@Component({
  selector: 'app-constant-item',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './constant-item.component.html',
  styleUrl: './constant-item.component.scss'
})
export class ConstantItemComponent {

  @Input({required: true}) constantConfig : ConstantConfig;
  @Output() onDelete : EventEmitter<ConstantConfig> = new EventEmitter<ConstantConfig>();

  constructor( public dialog: MatDialog,
    private apiService: ApiService
  ) {
  }

  onEditConstant() {
    const dialog = this.dialog.open(EditConstantComponent, {
      width: '700px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: JSON.parse(JSON.stringify(this.constantConfig))
    });

    dialog.afterClosed().subscribe({
      next: (response: ConstantConfig) => {
        if (response) {
          this.constantConfig = response;
        }
      }
    })
  }

  getConstantName(keyName: string) {
    switch (keyName) {
      case "IN" : return "Intelligent Network";
      case "HLR" : return "Home Location Register";
      default : return keyName;
    }
  }
}
