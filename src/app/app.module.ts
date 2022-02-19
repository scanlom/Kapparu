import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FundamentalsEditorComponent } from './components/fundamentals-editor/fundamentals-editor.component';
import { FundamentalsMiniEditorComponent } from './components/fundamentals-mini-editor/fundamentals-mini-editor.component';
import { ProjectionsEditorComponent } from './components/projections-editor/projections-editor.component';
import { FundamentalsMonitorComponent } from './components/fundamentals-monitor/fundamentals-monitor.component';
import { MergersMonitorComponent } from './components/mergers-monitor/mergers-monitor.component';
import { MergersEditorComponent } from './components/mergers-editor/mergers-editor.component';

import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { WatchMonitorComponent } from './components/watch-monitor/watch-monitor.component';
import { RefDataEditorComponent } from './components/ref-data-editor/ref-data-editor.component';
import { PortfoliosMonitorComponent } from './components/portfolios-monitor/portfolios-monitor.component';
import { PortfolioSummaryComponent } from './components/portfolio-summary/portfolio-summary.component';
import { PortfolioMonitorComponent } from './components/portfolio-monitor/portfolio-monitor.component';

@NgModule({
  declarations: [
    AppComponent,
    FundamentalsEditorComponent,
    FundamentalsMiniEditorComponent,
    ProjectionsEditorComponent,
    FundamentalsMonitorComponent,
    MergersMonitorComponent,
    MergersEditorComponent,
    WatchMonitorComponent,
    RefDataEditorComponent,
    PortfoliosMonitorComponent,
    PortfolioSummaryComponent,
    PortfolioMonitorComponent,
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
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
