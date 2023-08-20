import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddUserInsuranceProfileComponent } from './add-user-insurance-profile.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [{
  path: '',
  component: AddUserInsuranceProfileComponent
}]
@NgModule({
  declarations: [
    AddUserInsuranceProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class AddUserInsuranceProfileModule { }
