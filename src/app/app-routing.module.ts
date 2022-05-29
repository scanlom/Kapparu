import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FundamentalsMonitorComponent } from './components/fundamentals-monitor/fundamentals-monitor.component';
import { MergersMonitorComponent } from './components/mergers-monitor/mergers-monitor.component';
import { MergersEditorComponent } from './components/mergers-editor/mergers-editor.component';
import { WatchMonitorComponent } from './components/watch-monitor/watch-monitor.component';
import { AdminEditorComponent } from './components/admin-editor/admin-editor.component';
import { PortfoliosMonitorComponent } from './components/portfolios-monitor/portfolios-monitor.component';
import { PortfolioMonitorComponent } from './components/portfolio-monitor/portfolio-monitor.component';
import { PortfoliosHistoryMonitorComponent } from './components/portfolios-history-monitor/portfolios-history-monitor.component';
import { PositionMonitorComponent } from './components/position-monitor/position-monitor.component';
import { TransactionsMonitorComponent } from './components/transactions-monitor/transactions-monitor.component';

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
        path: 'position-monitor',
        component: PositionMonitorComponent
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
        path: 'transactions-monitor',
        component: TransactionsMonitorComponent
    },
    {
        path: 'portfolios-history-monitor',
        component: PortfoliosHistoryMonitorComponent,
        children: [
            {
                path: 'portfolios-monitor',
                component: PortfoliosMonitorComponent,
            },
        ]
    },
    {
        path: 'admin-editor',
        component: AdminEditorComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }