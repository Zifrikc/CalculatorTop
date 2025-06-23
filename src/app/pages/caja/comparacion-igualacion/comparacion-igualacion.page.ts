import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonButton, IonIcon, IonContent, IonFooter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, refreshOutline, addCircle, removeCircle } from 'ionicons/icons';

// Definición de tipos para una mayor seguridad del código
type MaterialId = 'U' | 'D' | 'C' | 'UM';
interface Material {
  id: MaterialId;
  nombre: string;
  valor: number;
  imageUrl: string; // Propiedad para la URL de la imagen
}
type Contador = { U: number; D: number; C: number; UM: number };

@Component({
  selector: 'app-comparacion-igualacion',
  templateUrl: './comparacion-igualacion.page.html',
  styleUrls: ['./comparacion-igualacion.page.scss'],
  standalone: true,
  imports: [
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
export class ComparacionIgualacionPage {

  materiales: Material[] = [
    // ACTUALIZACIÓN: Se añade la propiedad imageUrl con las URLs correspondientes
    { id: 'U', nombre: 'Unidad', valor: 1, imageUrl: 'https://res.cloudinary.com/tecnologi-zifrikc/image/upload/v1750047211/unidad_ideokk.png' },
    { id: 'D', nombre: 'Decena', valor: 10, imageUrl: 'https://res.cloudinary.com/tecnologi-zifrikc/image/upload/v1750047708/decena_n4owvo.png' },
    { id: 'C', nombre: 'Centena', valor: 100, imageUrl: 'https://res.cloudinary.com/tecnologi-zifrikc/image/upload/v1750047712/centena_etpbiy.png' },
    { id: 'UM', nombre: 'Unidad de Millar', valor: 1000, imageUrl: 'https://res.cloudinary.com/tecnologi-zifrikc/image/upload/v1750047736/millar_eqreqz.png' },
  ];

  seccionActiva: 'igualdad1' | 'igualdad2' = 'igualdad1';
  contadores: { [key: string]: Contador } = {};
  valores: { [key: string]: number } = {};
  animarValor: string | null = null; // NUEVA propiedad para controlar la animación

  constructor() {
    addIcons({ homeOutline, refreshOutline, addCircle, removeCircle });
    this.reiniciar();
  }

  reiniciar() {
    this.seccionActiva = 'igualdad1';
    this.contadores = {
      igualdad1: { U: 0, D: 0, C: 0, UM: 0 },
      igualdad2: { U: 0, D: 0, C: 0, UM: 0 },
      diferencia: { U: 0, D: 0, C: 0, UM: 0 },
    };
    this.valores = {
        igualdad1: 0,
        igualdad2: 0,
        diferencia: 0
    };
    this.calcularTodo();
  }

  seleccionarSeccion(seccion: 'igualdad1' | 'igualdad2') {
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
    const valoresAnteriores = {...this.valores};

    this.valores['igualdad1'] = this.calcularValor(this.contadores['igualdad1']);
    this.valores['igualdad2'] = this.calcularValor(this.contadores['igualdad2']);
    this.valores['diferencia'] = Math.abs(this.valores['igualdad1'] - this.valores['igualdad2']);
    this.contadores['diferencia'] = this.descomponerValor(this.valores['diferencia']);

    // Comparamos valores para saber qué número animar
    for(const key of ['igualdad1', 'igualdad2', 'diferencia']) {
        if(this.valores[key] !== valoresAnteriores[key]) {
            this.dispararAnimacion(key);
        }
    }
  }
// NUEVA función para la animación
  dispararAnimacion(key: string) {
    this.animarValor = key;
    setTimeout(() => {
        this.animarValor = null;
    }, 300); // La duración debe coincidir con la animación en CSS
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