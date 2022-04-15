import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
  path: 'tabs',
  loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
},
  {
    path: 'usertab1',
    loadChildren: () => import('./usertab1/usertab1.module').then( m => m.Usertab1PageModule)
  },
  {
    path: 'usertab2',
    loadChildren: () => import('./usertab2/usertab2.module').then( m => m.Usertab2PageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
