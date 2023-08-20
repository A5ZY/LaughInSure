import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'add-user-profile',
    loadChildren: () => import('./add-user-insurance-profile/add-user-insurance-profile.module').then(m => m.AddUserInsuranceProfileModule)
  },
  {
    path: 'list-insurance/:id',
    loadChildren: () => import('./insurance-details-dashboard/insurance-details-dashboard.module').then(m => m.InsuranceDetailsDashboardModule)
  },
  {
    path: '',
    redirectTo: 'add-user-profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
