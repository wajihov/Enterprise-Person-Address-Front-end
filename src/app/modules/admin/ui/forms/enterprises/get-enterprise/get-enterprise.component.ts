import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Enterprise } from 'app/shared/Models/Enterprise.model';
import { Person } from 'app/shared/Models/Person.model';
import { EnterpriseService } from 'app/shared/Service/enterprise/enterprise.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PersonService } from 'app/shared/Service/person/person.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, DialogExempleComponent } from '../dialog-exemple/dialog-exemple.component';
import { Address } from 'app/shared/Models/Address.model';




@Component({
  selector: 'app-get-enterprise',
  templateUrl: './get-enterprise.component.html',
  styleUrls: ['./get-enterprise.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GetEnterpriseComponent implements OnInit {

  enterprise: Enterprise;
  id: number;
  displayedColumnsList: string[] = ['id', 'name', 'lastname', 'post', 'local_address.address', 'details', 'actions'];

  columnsToDisplayWithExpand = [...this.displayedColumnsList, 'expand'];
  expandedElement: Address[] | null;
  datasourceList = new MatTableDataSource<Person>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  result: string = '';

  ngAfterViewInit() {
    this.datasourceList.paginator = this.paginator;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private enterpriseService: EnterpriseService,
    private personService: PersonService,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.enterpriseService.getEnterpriseById(this.id).subscribe(data => {
      this.enterprise = data;
      this.datasourceList = new MatTableDataSource<Person>(this.enterprise.persons);
    })
  }

  ListPersonsEnterprise(persons: Array<Person>) {
    console.log("les personnes : ", persons);
  }
  updateEnterprise(id: number, enterprise: Enterprise) {
    console.log("l'enterprise est : ", enterprise);
    this.router.navigate(['/ui/enterprises/update-enterprise/' + id]);
  }

  goToEnterprises() {
    this.router.navigate(['/ui/enterprises/allEnterprise']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasourceList.filter = filterValue.trim().toLowerCase();
    if (this.datasourceList.paginator) {
      this.datasourceList.paginator.firstPage();
    }
  }
  addPerson(enterpriseId: number) {
    console.log("L'id enterprise : ", enterpriseId);
    this.router.navigate(['ui/forms/persons/create-person/' + enterpriseId]);
  }

  updatePerson(id: number, person: Person) {
    console.log("L'id de person est : ", id, " /// ", person);
    this.router.navigate(['ui/forms/persons/update-person/' + id]);
  }

  deletePersonById(id: number, person: Person) {
    console.log("l'id supprimer est : ", id);
    const message = `Are you sure you want to Delete ${person.name} ?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(DialogExempleComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (!this.result) {
        console.log("le resultat est false ", this.result);
      } else {
        this.personService.deletePerson(id).subscribe({
          next: (resp) => {
            this.ngOnInit();
            console.log(resp);
          }, error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }

  isTableExpanded = false;

  toggleTableRows() {
    this.isTableExpanded = !this.isTableExpanded;

    this.datasourceList.data.forEach((row: any) => {
      row.isExpanded = this.isTableExpanded;
    })
  }
}  