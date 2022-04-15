import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Game } from '../../services/interfaces/Game';


@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  constructor(private authService: AuthService) { }
  games: Game[] = [];

  ngOnInit() {
    this.authService.getGames().then((games: Game[]) => {
      this.games = games;
      console.log(games)
    });
  }

}

