import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonButton, IonIcon, IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle,closeCircle, removeCircle, closeCircleOutline } from 'ionicons/icons';
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
  selector: 'app-cambio',
  templateUrl: './cambio.page.html',
  styleUrls: ['./cambio.page.scss'],
  standalone: true,
  imports: [ CommonModule, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonButton, IonIcon, IonContent ],
})
export class CambioPage {
  materiales: Material[] = [
    { id: 'U', nombre: 'Unidad', valor: 1, imageUrl: "../../../../assets/unidad1.png" },
    { id: 'D', nombre: 'Decena', valor: 10, imageUrl: '../../../../assets/decena.png' },
    { id: 'C', nombre: 'Centena', valor: 100, imageUrl: '../../../../assets/centena.png' },
    { id: 'UM', nombre: 'Unidad de Millar', valor: 1000, imageUrl: '../../../../assets/millar.png' },
  ];
  seccionActiva: 'inicio' | 'aumenta' | 'disminuye' | null = null;
  contadores: { [key: string]: Contador } = {};
  valores: { [key: string]: number } = {};
  animarValor: string | null = null;

  constructor(private router: Router) {
    addIcons({addCircle,removeCircle,closeCircle,closeCircleOutline});
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
      inicio: { U: 0, D: 0, C: 0, UM: 0 },
      aumenta: { U: 0, D: 0, C: 0, UM: 0 },
      disminuye: { U: 0, D: 0, C: 0, UM: 0 },
      final: { U: 0, D: 0, C: 0, UM: 0 },
    };
    this.valores = { inicio: 0, aumenta: 0, disminuye: 0, final: 0 };
    this.calcularTodo();
  }
  
  seleccionarSeccion(seccion: 'inicio' | 'aumenta' | 'disminuye' | null) {
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
    for (const seccion of ['inicio', 'aumenta', 'disminuye']) {
      this.valores[seccion] = this.calcularValor(this.contadores[seccion]);
    }
    this.valores['final'] = this.valores['inicio'] + this.valores['aumenta'] - this.valores['disminuye'];
    if (this.valores['final'] < 0) { this.valores['final'] = 0; }
    this.contadores['final'] = this.descomponerValor(this.valores['final']);

    for(const key of ['inicio', 'aumenta', 'disminuye', 'final']) {
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
