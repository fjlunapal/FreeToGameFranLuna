import { Component, OnInit } from '@angular/core';
import { Game } from '../services/interfaces/Game';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  games: Game[] = [];

  constructor(private authService: AuthService) { 
    this.games = authService.getCartGames();
  }

  ngOnInit() {
  }

}
