import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { InsuranceDetailsDashboardComponent } from './insurance-details-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FakeApiService } from '../services/fake-api.service';


const routes: Routes = [{
  path: '',
  component: InsuranceDetailsDashboardComponent
}]
@NgModule({
  declarations: [
    InsuranceDetailsDashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
})
export class InsuranceDetailsDashboardModule { }
