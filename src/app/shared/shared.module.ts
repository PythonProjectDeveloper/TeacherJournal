import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLanguageSettings } from '../common/helpers/factories';
import {
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';

@NgModule({
  declarations: [
    ButtonComponent,
    PageNotFoundComponent,
    BreadcrumbComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forChild(TranslateLanguageSettings())
  ],
  exports: [
    ButtonComponent,
    PageNotFoundComponent,
    BreadcrumbComponent,
    ToolbarComponent,
    TranslateModule
  ]
})
export class SharedModule { }
