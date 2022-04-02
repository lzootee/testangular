import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Http } from './http';

@Injectable({
  providedIn: 'root'
})

export class GamesService {

  constructor(private http: Http) { }

  public getGames() {
    return this.http.get(environment.apiURL + 'games.php');
  }

  public getJackPot() {
    return this.http.get(environment.apiURL + 'jackpots.php');
  }
}
