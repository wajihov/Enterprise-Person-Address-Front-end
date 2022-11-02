import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { GetEnterpriseComponent } from './get-enterprise/get-enterprise.component';
import { UpdateEnterpriseComponent } from './update-enterprise/update-enterprise.component';
import { DisplayEnterprisesComponent } from './display-enterprises/display-enterprises.component';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from 'app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DemoSidebarModule } from 'app/modules/admin/ui/page-layouts/common/demo-sidebar/demo-sidebar.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogExempleComponent } from './dialog-exemple/dialog-exemple.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

export const routes: Route[] = [

  { path: "", component: EnterpriseComponent },

  { path: "create-enterprise", component: EnterpriseComponent },
  { path: "update-enterprise/:id", component: UpdateEnterpriseComponent },
  { path: "allEnterprise", component: DisplayEnterprisesComponent },
  { path: "getEnterprise/:id", component: GetEnterpriseComponent },
  { path: '', redirectTo: 'allEnterprise', pathMatch: 'full' }
]


@NgModule({
  declarations: [
    EnterpriseComponent,
    GetEnterpriseComponent,
    UpdateEnterpriseComponent,
    DisplayEnterprisesComponent,
    DialogExempleComponent
  ],
  entryComponents: [DialogExempleComponent],
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    SharedModule,
    CommonModule,
    MatSidenavModule,
    DemoSidebarModule,
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatExpansionModule,    
    MatListModule,
    
  ]
})
export class EnterpriseModuleModule { }
