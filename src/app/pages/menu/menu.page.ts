import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonApp, IonList, IonMenu, IonMenuToggle, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { gridOutline, swapHorizontalOutline, helpCircleOutline } from 'ionicons/icons';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonRouterOutlet, IonList, IonApp, CommonModule, FormsModule, RouterLink, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonMenu, IonMenuToggle]
})
export class MenuPage {

  constructor() {
    // Agregamos los íconos específicos para esta página.
    addIcons({ gridOutline, swapHorizontalOutline, helpCircleOutline });
  }

}
