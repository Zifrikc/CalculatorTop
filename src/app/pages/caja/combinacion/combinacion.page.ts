import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonButton, IonIcon, IonContent, IonFooter, IonBackButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, refreshOutline, addCircle, removeCircle } from 'ionicons/icons';


// Definimos tipos para asegurar la integridad de los datos
type MaterialId = 'U' | 'D' | 'C' | 'UM';
interface Material {
  id: MaterialId;
  nombre: string;
  valor: number;
  imageUrl: string;
}
type Contador = { U: number; D: number; C: number; UM: number };

@Component({
  selector: 'app-combinacion',
  templateUrl: './combinacion.page.html',
  styleUrls: ['./combinacion.page.scss'],
  standalone: true,
  imports: [IonBackButton, 
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonButton,
    IonIcon,
    IonContent,
    IonFooter
  ],
})
export class CombinacionPage {

  materiales: Material[] = [
    // ACTUALIZACIÓN: Se añade la propiedad imageUrl con las URLs correspondientes
    { id: 'U', nombre: 'Unidad', valor: 1, imageUrl: 'https://res.cloudinary.com/tecnologi-zifrikc/image/upload/v1750047211/unidad_ideokk.png' },
    { id: 'D', nombre: 'Decena', valor: 10, imageUrl: 'https://res.cloudinary.com/tecnologi-zifrikc/image/upload/v1750047708/decena_n4owvo.png' },
    { id: 'C', nombre: 'Centena', valor: 100, imageUrl: 'https://res.cloudinary.com/tecnologi-zifrikc/image/upload/v1750047712/centena_etpbiy.png' },
    { id: 'UM', nombre: 'Unidad de Millar', valor: 1000, imageUrl: 'https://res.cloudinary.com/tecnologi-zifrikc/image/upload/v1750047736/millar_eqreqz.png' },
  ];

  seccionActiva: 'parte1' | 'parte2' = 'parte1';
  contadores: { [key: string]: Contador } = {};
  valores: { [key: string]: number } = {};

  constructor() {
    addIcons({ homeOutline, refreshOutline, addCircle, removeCircle });
    this.reiniciar();
  }

  reiniciar() {
    this.seccionActiva = 'parte1';
    this.contadores = {
      parte1: { U: 0, D: 0, C: 0, UM: 0 },
      parte2: { U: 0, D: 0, C: 0, UM: 0 },
      total: { U: 0, D: 0, C: 0, UM: 0 },
    };
    this.valores = {
        parte1: 0,
        parte2: 0,
        total: 0
    };
    this.calcularTodo();
  }

  seleccionarSeccion(seccion: 'parte1' | 'parte2') {
    this.seccionActiva = seccion;
  }

  agregar(tipoMaterial: MaterialId) {
    this.contadores[this.seccionActiva][tipoMaterial]++;
    this.calcularTodo();
  }

  quitar(tipoMaterial: MaterialId) {
    if (this.contadores[this.seccionActiva][tipoMaterial] > 0) {
      this.contadores[this.seccionActiva][tipoMaterial]--;
      this.calcularTodo();
    }
  }

  calcularTodo() {
    // 1. Calcular el valor numérico de cada parte
    this.valores['parte1'] = this.calcularValor(this.contadores['parte1']);
    this.valores['parte2'] = this.calcularValor(this.contadores['parte2']);

    // 2. Calcular el valor total
    this.valores['total'] = this.valores['parte1'] + this.valores['parte2'];

    // 3. Descomponer el valor total en U, D, C, UM para mostrarlo
    this.contadores['total'] = this.descomponerValor(this.valores['total']);
  }

  private calcularValor(contador: Contador): number {
    return (contador.UM * 1000) + (contador.C * 100) + (contador.D * 10) + contador.U;
  }

  private descomponerValor(valor: number): Contador {
    let restante = valor;
    const UM = Math.floor(restante / 1000);
    restante %= 1000;
    const C = Math.floor(restante / 100);
    restante %= 100;
    const D = Math.floor(restante / 10);
    restante %= 10;
    const U = restante;
    return { U, D, C, UM };
  }
}