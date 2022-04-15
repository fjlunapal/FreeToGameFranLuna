import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Game } from '../services/interfaces/Game';


@Component({
  selector: 'app-usertab1',
  templateUrl: './usertab1.page.html',
  styleUrls: ['./usertab1.page.scss'],
})
export class Usertab1Page implements OnInit {
  constructor(private authService: AuthService) { }
  games: Game[] = [];

  ngOnInit() {
    this.authService.getGames().then((games: Game[]) => {
      this.games = games;
      console.log(games)
    });
  }

}
