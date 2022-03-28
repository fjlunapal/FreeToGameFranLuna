import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab1userPageRoutingModule } from './tab1user-routing.module';

import { Tab1userPage } from './tab1user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab1userPageRoutingModule
  ],
  declarations: [Tab1userPage]
})
export class Tab1userPageModule {}
