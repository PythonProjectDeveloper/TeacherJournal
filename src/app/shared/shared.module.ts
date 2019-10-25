import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLanguageSettings } from '../common/helpers/factories';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import {
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatCheckboxModule
} from '@angular/material';

@NgModule({
  declarations: [
    ButtonComponent,
    PageNotFoundComponent,
    BreadcrumbComponent,
    ToolbarComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    TranslateModule.forChild(TranslateLanguageSettings())
  ],
  exports: [
    ButtonComponent,
    PageNotFoundComponent,
    BreadcrumbComponent,
    ToolbarComponent,
    DropdownComponent,
    TranslateModule
  ]
})
export class SharedModule { }
