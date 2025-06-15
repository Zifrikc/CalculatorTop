import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { addIcons } from 'ionicons';
import { IonApp, IonSplitPane, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonListHeader, IonItem, IonLabel, IonIcon, IonRouterOutlet } from '@ionic/angular/standalone';
import { home, grid, swapHorizontal, helpCircle } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonIcon,
    IonRouterOutlet,
  ],
})
export class AppComponent {

  // Array con las páginas principales para el menú lateral.
  public appPages = [
    { title: 'Menú Principal', url: '/menu', icon: 'home' },
    { title: 'Caja de Combinación', url: '/combinacion', icon: 'grid' },
    { title: 'Caja de Comparación', url: '/comparacion-igualacion', icon: 'swap-horizontal' },
    { title: 'Caja de Cambio', url: '/cambio', icon: 'help-circle' },
  ];

  constructor() {
    // Agregamos los íconos que vamos a utilizar en la aplicación.
    addIcons({ home, grid, swapHorizontal, helpCircle });
  }
}