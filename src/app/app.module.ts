import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FundamentalsEditorComponent } from './fundamentals-editor/fundamentals-editor.component';
import { FundamentalsMiniEditorComponent } from './fundamentals-mini-editor/fundamentals-mini-editor.component';
import { ProjectionsEditorComponent } from './projections-editor/projections-editor.component';

import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule} from '@angular/material/menu';
import { MatToolbarModule } from  '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
	FundamentalsEditorComponent,
	FundamentalsMiniEditorComponent,
	ProjectionsEditorComponent,
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
	MatMenuModule,
	MatToolbarModule,
	MatFormFieldModule,
	MatInputModule,
	FormsModule,
	ReactiveFormsModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
