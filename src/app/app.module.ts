import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { RiderHorseComponent } from './components/rider/horse/horse.component';
import { RiderComponent } from './components/rider/rider.component';
import { ScorelistHorseComponent } from './components/scorelist/horse/horse.component';
import { ScorelistComponent } from './components/scorelist/scorelist.component';
import { ScorelistRiderComponent } from './components/scorelist/rider/rider.component';
import { ScorelistScoretableComponent } from './components/scorelist/scoretable/scoretable.component';
import { StaticScorelistHorseComponent } from './components/staticscorelist/horse/horse.component';
import { StaticScorelistComponent } from './components/staticscorelist/scorelist.component';
import { StaticScorelistRiderComponent } from './components/staticscorelist/rider/rider.component';
import { StaticScorelistScoretableComponent } from './components/staticscorelist/scoretable/scoretable.component';
import { EventlistComponent } from './components/eventlist/eventlist.component';
import { EventComponent } from './components/eventlist/event/event.component';

@NgModule({
  declarations: [
    AppComponent,
    RiderHorseComponent,
    RiderComponent,
    ScorelistHorseComponent,
    ScorelistComponent,
    ScorelistRiderComponent,
    ScorelistScoretableComponent,
    StaticScorelistHorseComponent,
    StaticScorelistComponent,
    StaticScorelistRiderComponent,
    StaticScorelistScoretableComponent,
    EventlistComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
 }
