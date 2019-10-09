import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { MatIconModule, MatButtonModule, MatCardModule } from '@angular/material';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ButtonComponent, PageNotFoundComponent, BreadcrumbComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    RouterModule,
    MatCardModule
  ],
  exports: [ButtonComponent, PageNotFoundComponent, BreadcrumbComponent]
})
export class SharedModule { }
