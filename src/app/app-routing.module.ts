import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FundamentalsMonitorComponent } from './fundamentals-monitor/fundamentals-monitor.component';
import { MergersMonitorComponent } from './mergers-monitor/mergers-monitor.component';
import { MergersEditorComponent } from './mergers-editor/mergers-editor.component';

//This is my case 
const routes: Routes = [
    {
        path: '',
        component: FundamentalsMonitorComponent
    },
    {
        path: 'fundamentals-monitor',
        component: FundamentalsMonitorComponent
    },
    {
        path: 'mergers-monitor',
        component: MergersMonitorComponent
    },
    {
        path: 'mergers-editor',
        component: MergersEditorComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }