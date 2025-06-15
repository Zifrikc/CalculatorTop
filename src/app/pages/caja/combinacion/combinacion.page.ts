import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonFab, IonFabButton, IonIcon, IonSegment, IonSegmentButton, IonLabel, IonFooter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack, refresh } from 'ionicons/icons';

@Component({
  selector: 'app-combinacion',
  templateUrl: './combinacion.page.html',
  styleUrls: ['./combinacion.page.scss'],
  standalone: true,
  // El array 'imports' es crucial para que Angular sepa qué componentes usar.
  imports: [
    CommonModule,
    FormsModule, // <-- Necesario para el selector de Parte 1 / Parte 2
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, 
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, 
    IonFab, IonFabButton, IonIcon, IonSegment, IonSegmentButton, IonLabel, IonFooter,

  ]
})
export class CombinacionPage {

  parte1 = { unidades: 0, decenas: 0, centenas: 0 };
  parte2 = { unidades: 0, decenas: 0, centenas: 0 };
  total = { unidades: 0, decenas: 0, centenas: 0 };

  activeBox: 'parte1' | 'parte2' = 'parte1';

  constructor() {
    addIcons({ arrowBack, refresh });
    this.calcularTotal();
  }

  handleBlockChange(event: any) {
    console.log('📦 Evento recibido en combinación:', event);
    const targetBox = this.activeBox === 'parte1' ? this.parte1 : this.parte2;
    const typeKey = event.type as keyof typeof targetBox;

    if (event.action === 'add') {
      targetBox[typeKey]++;
      console.log(`✅ Añadido 1 a ${this.activeBox}.${typeKey}, ahora:`, targetBox[typeKey]);
    } else {
      if (targetBox[typeKey] > 0) {
        targetBox[typeKey]--;
        console.log(`❌ Removido 1 de ${this.activeBox}.${typeKey}, ahora:`, targetBox[typeKey]);
      }
    }

    this.calcularTotal();
  }

  calcularTotal() {
    let sumaUnidades = this.parte1.unidades + this.parte2.unidades;
    let sumaDecenas = this.parte1.decenas + this.parte2.decenas;
    let sumaCentenas = this.parte1.centenas + this.parte2.centenas;

    if (sumaUnidades >= 10) {
      sumaDecenas += Math.floor(sumaUnidades / 10);
      sumaUnidades %= 10;
    }

    if (sumaDecenas >= 10) {
      sumaCentenas += Math.floor(sumaDecenas / 10);
      sumaDecenas %= 10;
    }

    this.total = {
      unidades: sumaUnidades,
      decenas: sumaDecenas,
      centenas: sumaCentenas
    };

    console.log('🧮 Total actualizado:', this.total);
  }

  reiniciar() {
    this.parte1 = { unidades: 0, decenas: 0, centenas: 0 };
    this.parte2 = { unidades: 0, decenas: 0, centenas: 0 };
    this.calcularTotal();
    console.log('🔄 Se reinició todo.');
  }
}
