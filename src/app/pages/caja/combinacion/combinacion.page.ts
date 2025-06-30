import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonButton, IonIcon, IonContent, IonFooter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle, removeCircle, closeCircleOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { ScreenOrientation } from '@capacitor/screen-orientation';

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
  imports: [IonFooter,  CommonModule, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonButton, IonIcon, IonContent ],
})
export class CombinacionPage {
  materiales: Material[] = [
    { id: 'U', nombre: 'Unidad', valor: 1, imageUrl: 'https://res.cloudinary.com/tecnologi-zifrikc/image/upload/v1750047211/unidad_ideokk.png' },
    { id: 'D', nombre: 'Decena', valor: 10, imageUrl: 'https://res.cloudinary.com/tecnologi-zifrikc/image/upload/v1750047708/decena_n4owvo.png' },
    { id: 'C', nombre: 'Centena', valor: 100, imageUrl: 'https://res.cloudinary.com/tecnologi-zifrikc/image/upload/v1750047712/centena_etpbiy.png' },
    { id: 'UM', nombre: 'Unidad de Millar', valor: 1000, imageUrl: 'https://res.cloudinary.com/tecnologi-zifrikc/image/upload/v1750047736/millar_eqreqz.png' },
  ];
  seccionActiva: 'parte1' | 'parte2' | null = null;
  contadores: { [key: string]: Contador } = {};
  valores: { [key: string]: number } = {};
  animarValor: string | null = null;

  constructor(private router: Router) {
    addIcons({ addCircle, removeCircle, closeCircleOutline });
    this.reiniciar();
  }

  async ionViewWillEnter() {
    try {
        await ScreenOrientation.lock({ orientation: 'landscape' });
    } catch(error) {
        console.warn('Screen orientation lock failed:', error);
    }
  }

  async ionViewWillLeave() {
    try {
        await ScreenOrientation.unlock();
        await ScreenOrientation.lock({ orientation: 'portrait-primary' });
    } catch(error) {
        console.warn('Screen orientation unlock failed:', error);
    }
  }

  irAlMenu() {
    this.router.navigate(['/menu']);
  }

  reiniciar() {
    this.seccionActiva = null;
    this.contadores = {
      parte1: { U: 0, D: 0, C: 0, UM: 0 },
      parte2: { U: 0, D: 0, C: 0, UM: 0 },
      total: { U: 0, D: 0, C: 0, UM: 0 },
    };
    this.valores = { parte1: 0, parte2: 0, total: 0 };
    this.calcularTodo();
  }
  
  seleccionarSeccion(seccion: 'parte1' | 'parte2' | null) {
    if(seccion) {
      this.seccionActiva = this.seccionActiva === seccion ? null : seccion;
    } else {
      this.seccionActiva = null;
    }
  }

  agregar(tipoMaterial: MaterialId) {
    if(!this.seccionActiva) return;
    this.contadores[this.seccionActiva][tipoMaterial]++;
    this.calcularTodo();
  }
  
  quitar(tipoMaterial: MaterialId) {
    if(!this.seccionActiva) return;
    if (this.contadores[this.seccionActiva][tipoMaterial] > 0) {
      this.contadores[this.seccionActiva][tipoMaterial]--;
      this.calcularTodo();
    }
  }

  calcularTodo() {
    const valoresAnteriores = {...this.valores};
    this.valores['parte1'] = this.calcularValor(this.contadores['parte1']);
    this.valores['parte2'] = this.calcularValor(this.contadores['parte2']);
    this.valores['total'] = this.valores['parte1'] + this.valores['parte2'];
    this.contadores['total'] = this.descomponerValor(this.valores['total']);

    for(const key of ['parte1', 'parte2', 'total']) {
        if(this.valores[key] !== valoresAnteriores[key]) { this.dispararAnimacion(key); }
    }
  }
  
  dispararAnimacion(key: string) {
    this.animarValor = key;
    setTimeout(() => { this.animarValor = null; }, 300);
  }

  private calcularValor(contador: Contador): number {
    return (contador.UM * 1000) + (contador.C * 100) + (contador.D * 10) + contador.U;
  }
  
  private descomponerValor(valor: number): Contador {
    let restante = valor;
    const UM = Math.floor(restante / 1000); restante %= 1000;
    const C = Math.floor(restante / 100); restante %= 100;
    const D = Math.floor(restante / 10); restante %= 10;
    const U = restante;
    return { U, D, C, UM };
  }
}
