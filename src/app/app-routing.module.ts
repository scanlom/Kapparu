import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FundamentalsMonitorComponent } from './components/fundamentals-monitor/fundamentals-monitor.component';
import { MergersMonitorComponent } from './components/mergers-monitor/mergers-monitor.component';
import { MergersEditorComponent } from './components/mergers-editor/mergers-editor.component';
import { WatchMonitorComponent } from './components/watch-monitor/watch-monitor.component';
import { RefDataEditorComponent } from './components/ref-data-editor/ref-data-editor.component';
import { PortfoliosMonitorComponent } from './components/portfolios-monitor/portfolios-monitor.component';
import { PortfolioMonitorComponent } from './components/portfolio-monitor/portfolio-monitor.component';

//This is my case 
const routes: Routes = [
    {
        path: '',
        component: PortfoliosMonitorComponent
    }, 
    {
        path: 'portfolios-monitor',
        component: PortfoliosMonitorComponent
    },
    {
        path: 'portfolio-monitor',
        component: PortfolioMonitorComponent
    },
    {
        path: 'watch-monitor',
        component: WatchMonitorComponent
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
    },
    {
        path: 'ref-data-editor',
        component: RefDataEditorComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }