import { Component, OnInit } from '@angular/core';
import { Game } from '../services/interfaces/Game';
import { AuthService } from 'src/app/services/auth.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs=pdfFonts.pdfMake.vfs;

import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  games: Game[] = [];
  pdfObj = null;

  constructor(private authService: AuthService, private plt: Platform, private file: File, private fileOpener: FileOpener, public router: Router, private emailComposer: EmailComposer) { 
    this.games = authService.getCartGames();
  }

  ngOnInit() {
  }

  order(){
  //   var email = {
  //     to: this.authService.userEmail,
  //     subject: 'Free to game order',
  //     body: 'Here you have a resume of your order.',
  //     isHtml: true
  //   };
  //  this.emailComposer.open(email).then(null, function () {
  //    // user cancelled email
  //  });
    this.createPdf().then(() => {
      this.downloadPdf();

      this.authService.setCartGames([]);
      this.games = [];
    })
  }

  async createPdf() {
    var docDefinition = {
      content: [
        {image: await this.getBase64ImageFromURL("../../assets/freetogame.png")},
        { text: 'Games order', style: 'header' },
        { text: 'Date: ' + new Date().toTimeString(), style: 'subheader' },

        this.table(this.games)
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }
  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
    
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
    
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
    
        var dataURL = canvas.toDataURL("image/png");
    
        resolve(dataURL);
      };
    
      img.onerror = error => {
        reject(error);
      };
    
      img.src = url;
    });}
 
  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }

 table(data) {
  var value = [];
  var column = [];
  column.push({ text: 'Image', style: 'tableHeader'});
  column.push({ text: 'Title', style: 'tableHeader'});
  column.push({ text: 'Description', style: 'tableHeader'});
  value.push(column);
  
    for (let i = 0; i < data.length; i++) {
    const game = data[i];

    var row = new Array();
    row.push( game.thumbnail);
    row.push( game.title);
    row.push( game.short_description);
    value.push(row);
  }
    return {
        table: {
            widths: [ '*', '*', '*' ],
            headerRows: 1,
            body: value
        }
    };
}

goAnOtherPage() {
  this.router.navigate(['/usertab1/tab3']);
}

}
