import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EnterpriseService } from 'app/shared/Service/enterprise/enterprise.service';
import { Enterprise } from 'app/shared/Models/Enterprise.model';
import { trigger, state, style, animate, transition } from "@angular/animations";
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, DialogExempleComponent } from '../dialog-exemple/dialog-exemple.component';


@Component({
  selector: 'app-display-enterprises',
  templateUrl: './display-enterprises.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./display-enterprises.component.scss']
})
export class DisplayEnterprisesComponent implements OnInit, OnDestroy, AfterViewInit {
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  displayedColumns: string[] = ['id', 'name', 'tax_number'];
  enterprises: any;
  errorMessage!: string;
  dataSource = new MatTableDataSource<Enterprise>();

  columnsToDisplayWithExpand = [...this.displayedColumns, 'local_address', 'expand'];
  expandedElement: Enterprise | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  result: string = '';

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Constructor
   */
  constructor(
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private enterpriseService: EnterpriseService,
    private _router: Router,
    public dialog: MatDialog) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {

        // Set the drawerMode and drawerOpened
        if (matchingAliases.includes('lg')) {
          this.drawerMode = 'side';
          this.drawerOpened = true;
        }
        else {
          this.drawerMode = 'over';
          this.drawerOpened = false;
        }
      });
    this.enterpriseService.getEnterprises().subscribe(
      {
        next: (data) => {
          this.enterprises = data;
          this.dataSource = new MatTableDataSource<Enterprise>(this.enterprises);
          this.dataSource.paginator = this.paginator;
        }, error: (err) => {
          this.errorMessage = err;
          console.log("Erreur au niveau de getEnterprises ", err);

        }
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  updateEnterprise(id: Number, enterprise: Enterprise) {
    this._router.navigate(['/ui/forms/enterprises/update-enterprise/' + id]);
  }
  ListPersonsEnterprise(enterprise: Enterprise) {
    this._router.navigate(['/ui/forms/enterprises/getEnterprise/' + enterprise.id]);
  }

  deleteEnterprise(enterprise: Enterprise) {

    const message = `Are you sure you want to delete this enterprise ${enterprise.name} ?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(DialogExempleComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result) {
        this.enterpriseService.deleteEnterprise(enterprise.id).subscribe({
          next: (respo) => {
            console.log("Your file has been deleted", respo);
            this.ngOnInit();
          }, error: (err) => {
            console.log(err);
            this.errorMessage = err;
          }
        })
      } else {
        console.log("Pas de supprission");
      }
    });
  }
}
