import { Component, OnInit } from '@angular/core';
import { GamesService } from '../shared/services/games.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  listGames = [];
  listCategories: { catId: string, name: string, active: boolean, games: any[]} [] = [];
  itemGames = <any>[];
  intervalSpot: any;

  constructor(private gameService: GamesService) { }

  ngOnInit(): void {
    this.getGames();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalSpot);
  }

  getGames() {
    this.gameService.getGames().subscribe((res: any) => {
      let existCategory: any[] = [];
      this.listGames = res;
      res.forEach((e: any) => {
        e.categories.forEach((cat: any) => {
            if (["ball", "virtual", "fun"].includes(cat)) {
              cat = "other";
            }
            if (!existCategory.includes(cat)) {
              existCategory.push(cat);
              this.listCategories.push({
                catId: cat,
                name: cat,
                active: false,
                games: []
              });
            }
        });
      });

      this.listGames.forEach((e: any) => {
        if (e.categories.includes("top") || e.categories.includes("new")) {
          e.displayRibbon = NEW_RIBBON;
        } else {
          e.displayRibbon = EMPTY_STR;
        }
        this.listCategories.forEach((cat: any) => {
          if (e.categories.includes(cat.catId)) {
            cat.games.push(e);
          }

          if (cat.catId == "other" && (e.categories.includes("ball") || e.categories.includes("virtual") || e.categories.includes("fun"))) {
            cat.games.push(e);
          }
        });
      });
      
      this.setDefaultLoad();
    });
  }

  getJackPot() {
    this.gameService.getJackPot().subscribe((res: any) => {
      this.itemGames.forEach((g: any) => {
        let jackPotGame = res.find((x: { game: any; amount: any }) => x.game == g.id);
        if (jackPotGame) {
            let dollarUSLocale = Intl.NumberFormat('en-US');
            g.amount = dollarUSLocale.format(jackPotGame.amount);
        } else {
          g.amount = 0;
        }
      });
    });
  }

  loadGames(catId: string) {
    this.listCategories.forEach(e => {
      e.active = false;
    });
    let category = this.listCategories.find(x => x.catId === catId);
    if (category) {
      category.active = true;
      this.itemGames = category?.games;
      this.getJackPot();
      this.intervalSpot = setInterval(() => {
        this.getJackPot();
      }, UPDATE_TIME_JACKPOT);
    }
  }

  setDefaultLoad() {
    this.loadGames(this.listCategories[0].catId);
    this.listCategories[0].active = true;
  }
}

const NEW_RIBBON = "NEW";
const EMPTY_STR = "";
const UPDATE_TIME_JACKPOT = 60000;