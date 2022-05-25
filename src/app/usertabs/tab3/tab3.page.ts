import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Game } from 'src/app/services/interfaces/Game';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private authService: AuthService, public alert: AlertController, public router: Router, private modalCtrl: ModalController) {
    this.carrito= [];
  }

  games: Game[] = [];
  carrito: Game[] = [];
  // public order = environment.orderData;

  ngOnInit() {
    this.refreshFavouriteGames();
    this.carrito= [];
  }

  ionViewDidEnter(){
    console.log("ionViewDidEnter")
    this.refreshFavouriteGames();
    this.carrito=this.authService.getCartGames();
    console.log(this.authService.cartGames)
}

  deleteFavouriteGame(game: Game){
    this.authService.deleteFavourites(game).then(() => {
      this.refreshFavouriteGames();
    });
  }
  
  private refreshFavouriteGames(){
    this.authService.getFavourites().then((games: Game[]) => {
      this.games = games;
      console.log(games);
      if(games === null || games.length === 0){
        this.noFavouritesAlert();
      }
    });
  }

  async noFavouritesAlert() {
    const alert = await this.alert.create({
      header: 'Warning',
      message: 'You dont have any favourite games yet',
      buttons: [
        {
          text: 'Ok',
          id: 'cancel-button',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
            this.router.navigate(['/usertab1/tab1']);
          }
        }
      ]
    });
    await alert.present();
  }

  addCart(game){
    this.carrito.push(game);
    console.log(this.carrito);
  }

  openCart(){
    this.authService.setCartGames(this.carrito)
    this.carrito=[];
    this.router.navigate(['/cart']);
  }
}

