import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootPageRoutes } from './routes/root-page-routes';

@NgModule({
  imports: [RouterModule.forRoot(rootPageRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
