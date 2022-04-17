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
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getGames().then((games: Game[]) => {
      this.games = games;
      console.log(games)
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

}

