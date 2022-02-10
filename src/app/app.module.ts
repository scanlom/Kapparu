import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { FundamentalsEditorComponent } from './fundamentals-editor/fundamentals-editor.component';
import { FundamentalsMiniEditorComponent } from './fundamentals-mini-editor/fundamentals-mini-editor.component';
import { ProjectionsEditorComponent } from './projections-editor/projections-editor.component';
import { FundamentalsMonitorComponent } from './fundamentals-monitor/fundamentals-monitor.component';
import { MergersMonitorComponent } from './mergers-monitor/mergers-monitor.component';
import { MergersEditorComponent } from './mergers-editor/mergers-editor.component';

import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    FundamentalsEditorComponent,
    FundamentalsMiniEditorComponent,
    ProjectionsEditorComponent,
    FundamentalsMonitorComponent,
    MergersMonitorComponent,
    MergersEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    MatMenuModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
