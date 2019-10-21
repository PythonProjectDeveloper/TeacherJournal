import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { MatIconModule, MatButtonModule, MatCardModule, MatFormField, MatFormFieldModule, MatInputModule } from '@angular/material';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ButtonComponent, PageNotFoundComponent, BreadcrumbComponent, ToolbarComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  exports: [ButtonComponent, PageNotFoundComponent, BreadcrumbComponent, ToolbarComponent]
})
export class SharedModule { }
