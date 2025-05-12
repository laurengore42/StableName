import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RiderComponent } from './components/rider/rider.component';
import { ScorelistComponent } from './components/scorelist/scorelist.component';
import { EventlistComponent } from './components/eventlist/eventlist.component';

const routes: Routes = [
    {
        path: 'rider/:fei',
        component: RiderComponent
    },
    {
        path: 'scores/:compfei',
        component: ScorelistComponent
    },
    {
        path: 'events',
        component: EventlistComponent
    },
    // TO DO remove this last redirect for show mode
    {
        path: '',
        redirectTo: '/events',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            FormsModule,
            HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
