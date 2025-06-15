import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadComponent: () => import('./pages/welcome/welcome.page').then( m => m.WelcomePage)
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.page').then( m => m.MenuPage)
  },
  {
    path: 'combinacion',
    loadComponent: () => import('./pages/caja/combinacion/combinacion.page').then( m => m.CombinacionPage)
  },
  {
    path: 'comparacion-igualacion',
    loadComponent: () => import('./pages/caja/comparacion-igualacion/comparacion-igualacion.page').then( m => m.ComparacionIgualacionPage)
  },
  {
    path: 'cambio',
    loadComponent: () => import('./pages/caja/cambio/cambio.page').then( m => m.CambioPage)
  }
];

