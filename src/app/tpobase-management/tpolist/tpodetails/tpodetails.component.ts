import { Component, OnInit } from '@angular/core';
import { SketchComponent } from '../../sketch/sketch.component';
import { Slide } from '../../../payload/slide';
import { MatIcon } from '@angular/material/icon';
import { Location, NgForOf, NgIf } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { EditTpoComponent } from '../edit-tpo/edit-tpo.component';
import { TPOData } from '../../../models/tpodata';
import { MatDialog } from '@angular/material/dialog';
import { TPOWorkOrder } from '../../../models/tpowork-order';
import { ApiService } from '../../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastMessageComponent } from '../../toast-message/toast-message.component';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { EditFlowComponent } from './edit-flow/edit-flow.component';
import { UseWorkOrderComponent } from './use-work-order/use-work-order.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AddSystemStateComponent } from './add-system-state/add-system-state.component';
import { AddFailureTpoComponent } from './add-failure-tpo/add-failure-tpo.component';
import { TpoFailureState } from '../../../models/tpo-failure-state';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-tpodetails',
  standalone: true,
  imports: [
    SketchComponent,
    MatIcon,
    MatButton,
    NgIf,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    NgForOf,
    MatProgressSpinner
  ],
  templateUrl: './tpodetails.component.html',
  styleUrl: './tpodetails.component.scss',
})
export class TPODetailsComponent implements OnInit {
  slide: Slide = {
    image: 'assets/tpo-slide-2.png',
    description:
      '" Dive into the world of your configurations with ease and accuracy. <br> Let\'s shape the future of configuration together!"',
  };

  tpoData: TPOData;
  tpoWorkOrders: Array<TPOWorkOrder> = new Array<TPOWorkOrder>();
  failureTpoWorkOrders: Array<TPOWorkOrder> = new Array<TPOWorkOrder>();
  isLoadingFailure = false;
  isLoading = false;
  isLoadingPattern = false;
  currentWO: TPOWorkOrder;

  constructor(
    private location: Location,
    public dialog: MatDialog,
    private apiService: ApiService,
    private router: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    let tpoId = this.router.snapshot.paramMap.get('tpoId');
    if (tpoId == null) {
      this.onGoBack();
      return;
    }
    this.loadData(+tpoId);
  }

  loadData(tpoId: number) {
    this.isLoading = true;
    this.apiService.getTpoDataById(tpoId).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.tpoData = response;
        this.getPatterns(tpoId);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this._snackBar.openFromComponent(ToastMessageComponent, {
          data: error.message ? error.message : 'Something wrong!',
          duration: 5000,
          panelClass: ['bg-danger'],
        });
        this.onGoBack();
      },
    });
  }

  getPatterns(tpoId: number) {
    this.isLoadingPattern = true;
    this.apiService.getAllTpoWordOrder(tpoId).subscribe({
      next: (response) => {
        this.isLoadingPattern = false;
        this.tpoWorkOrders = response;
        // for (let i = response.length - 1; i >= 0; i--) {
        //   this.failureTpoWorkOrders = [...this.failureTpoWorkOrders, ...response[i].linkedList];
        // }
      },
      error: (error: HttpErrorResponse) => {
        this.isLoadingPattern = false;
        this._snackBar.openFromComponent(ToastMessageComponent, {
          data: error.message ? error.message : 'Something wrong!',
          duration: 5000,
          panelClass: ['bg-danger'],
        });
      },
    });
  }

  onGoBack() {
    this.location.back();
  }

  onEditFlow() {
    const dialog = this.dialog.open(EditFlowComponent, {
      width: '700px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: JSON.parse(
        JSON.stringify({
          tpoId: this.tpoData.id,
          tpoWorkOrders: this.tpoWorkOrders,
        })
      ),
    });

    dialog.afterClosed().subscribe({
      next: (response: Array<TPOWorkOrder>) => {
        if (response) {
          this.tpoWorkOrders = response;
        }
      },
    });
  }

  onUseWorkOrder() {
    const dialog = this.dialog.open(UseWorkOrderComponent, {
      width: '700px',
      minHeight: '500px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: JSON.parse(
        JSON.stringify({
          tpoId: this.tpoData.id,
          wk: this.tpoWorkOrders,
        })
      ),
    });

    dialog.afterClosed().subscribe({
      next: (response: Array<TPOWorkOrder>) => {
        if (response.length > 0) {
          this.tpoWorkOrders.push(...response);
          this.updateFailureWk();
          // console.log(response);
          // this.tpoWorkOrders = [...this.tpoWorkOrders, ...response];
        }
      },
    });
  }

  onRemoveWkFromTpo(wk: TPOWorkOrder) {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: 'Are you sure you want to remove this work order?',
    });

    dialog.afterClosed().subscribe({
      next: (response: boolean) => {
        if (response) {
          this.apiService.removeTpoWordOrder(this.tpoData.id, wk.id).subscribe({
            next: (response) => {
              this.tpoWorkOrders = this.tpoWorkOrders.filter(
                (item) => item.id != wk.id
              );
              this.updateFailureWk();
            },
            error: (error: HttpErrorResponse) => {
              this._snackBar.openFromComponent(ToastMessageComponent, {
                data: error.message ? error.message : 'Something wrong!',
                duration: 5000,
                panelClass: ['bg-danger'],
              });
            },
          });
        }
      },
    });
  }

  updateFailureWk() {
    this.failureTpoWorkOrders = [];
    // for (let i = this.tpoWorkOrders.length - 1; i >= 0; i--) {
    //   this.failureTpoWorkOrders = [...this.failureTpoWorkOrders, ...this.tpoWorkOrders[i].linkedList];
    // }
  }

  onAddSystemState() {
    const dialog = this.dialog.open(AddSystemStateComponent, {
      width: '700px',
      minHeight: '500px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: JSON.parse(JSON.stringify(this.tpoData)),
    });

    dialog.afterClosed().subscribe({
      next: (response: TPOData) => {
        // todo: Implement this
      },
    });
  }

  onAddTpoFailure(wo: TPOWorkOrder) {
    let tpoFailureState = new TpoFailureState();
    if (wo.tpoFailureState != null) {
      tpoFailureState = wo.tpoFailureState;
    } else {
      tpoFailureState.tpoId = this.tpoData.id;
      tpoFailureState.woId = wo.id;
    }

    const dialog = this.dialog.open(AddFailureTpoComponent, {
      width: '700px',
      minHeight: '200px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: JSON.parse(JSON.stringify(tpoFailureState)),
    });

    dialog.afterClosed().subscribe({
      next: (response: TpoFailureState) => {
        if (response) {
          wo.tpoFailureState = response;
        }
      },
    });
  }

  ondeleteTpoFailure(wo: TPOWorkOrder) {
    this.apiService
      .deleteFailureTpo(wo.tpoFailureState.id, this.tpoData.id)
      .subscribe({
        next: (response) => {
          wo.tpoFailureState = null;
          this._snackBar.openFromComponent(ToastMessageComponent, {
            data: 'Tpo Failure deleted successfully!',
            duration: 5000,
            panelClass: ['bg-success'],
          });
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this._snackBar.openFromComponent(ToastMessageComponent, {
            data: error.message ? error.message : 'Something wrong!',
            duration: 5000,
            panelClass: ['bg-danger'],
          });
        },
      });
  }

  onViewTpoFailure(wo: TPOWorkOrder) {
    this.isLoadingFailure = true;
    this.apiService
      .getAllTpoWordOrder(wo.tpoFailureState.tpoFailureId)
      .subscribe({
        next: (response) => {
          this.isLoadingFailure = false;
          this.failureTpoWorkOrders = response;
          this.currentWO = wo;
        },
        error: (error: HttpErrorResponse) => {
          this.isLoadingFailure = false;
          this._snackBar.openFromComponent(ToastMessageComponent, {
            data: error.message ? error.message : 'Something wrong!',
            duration: 5000,
            panelClass: ['bg-danger'],
          });
        },
      });
  }
}
