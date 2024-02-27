import {Component, OnInit} from '@angular/core';
import {SketchComponent} from "../sketch/sketch.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {TpoItemComponent} from "./tpo-item/tpo-item.component";
import {Slide} from '../../payload/slide';
import {TPOData} from "../../models/tpodata";
import {Loadable} from "../../interfaces/loadable";
import {ApiService} from "../../services/api.service";
import {Page} from "../../payload/page";
import {LoaderSkeletonItemComponent} from "./loader-skeleton-item/loader-skeleton-item.component";
import {EditTpoComponent} from "./edit-tpo/edit-tpo.component";
import {MatDialog} from "@angular/material/dialog";
import { DeleteTpoComponent } from './delete-tpo/delete-tpo.component';
import { ApiResponse } from '../../payload/api-response';

@Component({
  selector: 'app-tpolist',
  standalone: true,
  imports: [SketchComponent, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatMenuModule, TpoItemComponent, LoaderSkeletonItemComponent],
  templateUrl: './tpolist.component.html',
  styleUrl: './tpolist.component.scss'
})
export class TPOListComponent implements OnInit, Loadable {
  slide: Slide = {
    image: "assets/tpo-slide-1.png",
    description: "\"Explore the future of your configurations with simplicity and precision. <br> Configuring is innovating!\""
  };
  tposPage: Page<TPOData> = new Page<TPOData>();
  loading: boolean;
  search = "";
  page = 0;
  size = 50;

  constructor(private apiService: ApiService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.apiService.getTpoData(this.search, this.page, this.size).subscribe({
      next: response => {
        this.loading = false;
        this.tposPage = response;
        // console.log(this.tposPage);
      },
      error: error => {
        this.loading = false;
      }
    });
  }

  handlePageEvent(event: any) {
    if (event.pageSize != this.size) {
      this.size = event.pageSize;
      this.page = 0;
    } else {
      this.page = event.pageIndex;
    }
    this.loadData();
  }

  onAddTpo(enterAnimationDuration = '250ms', exitAnimationDuration = '250ms') {
    const dialog = this.dialog.open(EditTpoComponent, {
      width: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialog.afterClosed().subscribe({
      next: (response: TPOData) => {
        if (response) {
          this.tposPage.content.unshift(response);
        }
      }
    })
  }

  onSearch(search : string) {
    // todo : make search here
    console.log(search);
  }

  onDeleteTpo(tpo : TPOData) { 
    
    const dialog = this.dialog.open(DeleteTpoComponent, {
      width: '700px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data : tpo.id
    });

    dialog.afterClosed().subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          let index = this.tposPage.content.findIndex(value => value.id == tpo.id);
          if (index != -1) {
            this.tposPage.content.splice(index, 1);
          }
        }
      }
    })
  }
}
