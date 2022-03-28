import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab1userPage } from './tab1user.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1userPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1userPageRoutingModule {}
