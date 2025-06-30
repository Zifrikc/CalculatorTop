import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonApp, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { gridOutline, swapHorizontalOutline, helpCircleOutline, gitCompareOutline, addCircleOutline } from 'ionicons/icons';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonButton, IonRouterOutlet, IonList, IonApp, CommonModule, FormsModule, RouterLink, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonMenu, IonMenuToggle]
})
export class MenuPage {

  constructor() {
    // Agregamos los íconos específicos para esta página.
    addIcons({swapHorizontalOutline,gitCompareOutline,addCircleOutline,gridOutline,helpCircleOutline});
  }
  
  showSplash: boolean = true;
  showWelcomeModal: boolean = false;
  ngOnInit() {
    this.showWelcomeModal = true;
  } 

     //  Nueva función para cerrar el modal de bienvenida
  closeWelcomeModal() {
    this.showWelcomeModal = false;
  }
}
