import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { rootPageRoutes } from './routings/root-page-routes';

@NgModule({
  imports: [RouterModule.forRoot(rootPageRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
