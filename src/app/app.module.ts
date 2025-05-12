import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { HorseDescriptionComponent } from './components/horse/description/description.component';
import { HorseDrawingComponent } from './components/horse/drawing/drawing.component';
import { RiderComponent } from './components/rider/rider.component';
import { RiderNameComponent } from './components/rider/name/name.component';
import { RiderHorseComponent } from './components/rider/horse/horse.component';
import { ScorelistComponent } from './components/scorelist/scorelist.component';
import { ScorelistHorseComponent } from './components/scorelist/horse/horse.component';
import { ScorelistRiderComponent } from './components/scorelist/rider/rider.component';
import { ScorelistScoretableComponent } from './components/scorelist/scoretable/scoretable.component';
import { EventlistComponent } from './components/eventlist/eventlist.component';
import { EventComponent } from './components/eventlist/event/event.component';

@NgModule({
  declarations: [
    AppComponent,
    HorseDescriptionComponent,
    HorseDrawingComponent,
    RiderComponent,
    RiderNameComponent,
    RiderHorseComponent,
    ScorelistComponent,
    ScorelistHorseComponent,
    ScorelistRiderComponent,
    ScorelistScoretableComponent,
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
