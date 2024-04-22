import { Component } from '@angular/core';
import { SketchComponent } from '../../sketch/sketch.component';
import { Slide } from '../../../payload/slide';
import { MatIcon } from '@angular/material/icon';
import { Location } from '@angular/common';
import {MatButton} from "@angular/material/button";
import {EditTpoComponent} from "../edit-tpo/edit-tpo.component";
import {TPOData} from "../../../models/tpodata";
import {AddWorkOrderComponent} from "./add-work-order/add-work-order.component";
import {MatDialog} from "@angular/material/dialog";
import {TPOWorkOrder} from "../../../models/tpowork-order";

@Component({
  selector: 'app-tpodetails',
  standalone: true,
  imports: [SketchComponent, MatIcon, MatButton],
  templateUrl: './tpodetails.component.html',
  styleUrl: './tpodetails.component.scss'
})
export class TPODetailsComponent {
  slide : Slide = {
    image: "assets/tpo-slide-2.png",
    description: "\" Dive into the world of your configurations with ease and accuracy. <br> Let's shape the future of configuration together!\""
  };

  tpoWorkOrders: Array<TPOWorkOrder> = new Array<TPOWorkOrder>();

  constructor(private location: Location, public dialog: MatDialog) {

  }

  onGoBack() {
    this.location.back();
  }

  onEditFlow() {

  }

  onAddWorkOrder () {
    const dialog = this.dialog.open(AddWorkOrderComponent, {
      width: '700px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });

    dialog.afterClosed().subscribe({
      next: (response: TPOWorkOrder) => {
        if (response) {
          this.tpoWorkOrders.push(response);
        }
      }
    })
  }
}
