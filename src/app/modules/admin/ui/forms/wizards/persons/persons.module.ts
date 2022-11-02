import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { PersonsComponent } from './create-person/persons.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from 'app/shared/shared.module';
import { UpdatePersonComponent } from './update-person/update-person.component';

export const routes: Route[] = [
  { path: 'create-person/:id', component: PersonsComponent },
  { path: 'update-person/:id', component: UpdatePersonComponent },


];

@NgModule({
  declarations: [
    PersonsComponent,
    UpdatePersonComponent
  ],
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
  ]
})
export class PersonsModule { }
