import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Game } from '../../services/interfaces/Game';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  games: Game[] = [];
  favourites: Game[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getGames().then((games: Game[]) => {
      this.games = games;
      this.refreshFavouriteGames();
    });
    
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      if (this.games.length === 400) {
        event.target.disabled = true;
      }
    }, 500);
  }

  addFavourite(game: Game){
    this.authService.addFavourite(game).then(favourites => {
      this.refreshFavouriteGames();
    })
    
  }

  private refreshFavouriteGames(){
    this.authService.getFavourites().then(favourite => {
      if(favourite === null){
        favourite = []
      }
      console.log(this.games);
      this.games.forEach((game)=> {
        game.favourite = false;
        favourite.forEach((favourite)=> {
          if(favourite.id === game.id){
            game.favourite = true;
          }
        });
      });
      this.favourites = favourite;
      
      console.log(this.games);
    });
  }
}

