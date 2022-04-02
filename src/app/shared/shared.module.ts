import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesService } from './services/games.service';
import { Http } from './services/http';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    GamesService,
    Http
  ]
})
export class SharedModule { }
