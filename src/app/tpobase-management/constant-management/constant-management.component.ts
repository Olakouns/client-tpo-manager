import {Component, OnInit} from '@angular/core';
import {SketchComponent} from "../sketch/sketch.component";
import {Slide} from "../../payload/slide";
import {MatIcon} from "@angular/material/icon";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {ConstantConfig} from "../../models/constant-config";
import {LoaderSkeletonItemComponent} from "../tpolist/loader-skeleton-item/loader-skeleton-item.component";
import {TpoItemComponent} from "../tpolist/tpo-item/tpo-item.component";
import {ConstantItemComponent} from "./constant-item/constant-item.component";
import { EditConstantComponent } from './edit-constant/edit-constant.component';
import { DeleteConstantComponent } from './delete-constant/delete-constant.component';
import { ApiResponse } from '../../payload/api-response';

@Component({
  selector: 'app-constant-management',
  standalone: true,
  imports: [
    SketchComponent,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    LoaderSkeletonItemComponent,
    TpoItemComponent,
    ConstantItemComponent,
    MatButtonModule
  ],
  templateUrl: './constant-management.component.html',
  styleUrl: './constant-management.component.scss'
})
export class ConstantManagementComponent implements OnInit {
  slide: Slide = {
    image: "assets/tpo-slide-3.png",
    description: "\" Dive into the world of your configurations with ease and accuracy. <br> Let's shape the future of configuration together!\""
  };

  loading: boolean;

  constantsConfig: Array<ConstantConfig> = new Array<ConstantConfig>();


  constructor(private location: Location,
              public dialog: MatDialog,
              private apiService: ApiService,
              private router: ActivatedRoute,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.apiService.getAllConstantConfig().subscribe({
      next: response => {
        this.loading = false;
        this.constantsConfig = response;
      },
      error: error => {
        this.loading = false;
      }
    });
  }

  onGoBack() {
    this.location.back();
  }

  onAddConstant() {
    const dialog = this.dialog.open(EditConstantComponent, {
      width: '700px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });

    dialog.afterClosed().subscribe({
      next: (response: ConstantConfig) => {
        if (response) {
          this.constantsConfig.unshift(response);
        }
      }
    })
  }

  onEditConstant() {

  }

  onDeleteConstant(data : ConstantConfig) {
    const dialog = this.dialog.open(DeleteConstantComponent, {
      width: '700px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data : data.id
    });

    dialog.afterClosed().subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          let index = this.constantsConfig.findIndex(value => value.id == data.id);
          if (index != -1) {
            this.constantsConfig.splice(index, 1);
          }
        }
      }
    })
  }


}
