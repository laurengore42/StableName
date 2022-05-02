import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ScorelistHorseComponent } from './components/scorelist/horse/horse.component';
import { ScorelistComponent } from './components/scorelist/scorelist.component';
import { ScorelistRiderComponent } from './components/scorelist/rider/rider.component';
import { ScorelistScoretableComponent } from './components/scorelist/scoretable/scoretable.component';

@NgModule({
  declarations: [
    AppComponent,
    ScorelistHorseComponent,
    ScorelistComponent,
    ScorelistRiderComponent,
    ScorelistScoretableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
 }
