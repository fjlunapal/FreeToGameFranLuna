import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Game, Platform } from 'src/app/services/interfaces/Game';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private authService: AuthService) {}

  games: Game[] = [];
  
  ngOnInit() {
    this.authService.getGames().then((games: Game[]) => {
      this.games = games;
    });
  }
  
  showWAll(){
    this.authService.getGamesByPlatform("all").then((games: Game[]) => {
      this.games = games;
    });
  }

  showWindows(){
    this.authService.getGamesByPlatform("pc").then((games: Game[]) => {
      this.games = games;
    });
  }

  showWebBrowser(){
    this.authService.getGamesByPlatform("browser").then((games: Game[]) => {
      this.games = games;
    });
  }

  selectedPlatform(ev: any) {
    console.log(ev.detail);
    if (ev.detail.value === Platform.WebBrowser.toString()){
      this.showWebBrowser();
    }
    else if(ev.detail.value === Platform.PCWindows.toString()){
      this.showWindows();
    }
    else{
      this.showWAll();
    }
  }
}
