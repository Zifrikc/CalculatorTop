import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonButton, IonIcon, IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle,closeCircle, removeCircle, closeCircleOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { ScreenOrientation } from '@capacitor/screen-orientation'; // 1. Importar el plugin

type MaterialId = 'U' | 'D' | 'C' | 'UM';
interface Material {
  id: MaterialId;
  nombre: string;
  valor: number;
  imageUrl: string;
}
type Contador = { U: number; D: number; C: number; UM: number };

@Component({
  selector: 'app-comparacion-igualacion',
  templateUrl: './comparacion-igualacion.page.html',
  styleUrls: ['./comparacion-igualacion.page.scss'],
  standalone: true,
  imports: [ CommonModule, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonButton, IonIcon, IonContent ],
})
export class ComparacionIgualacionPage {
  // ... (propiedades de materiales, seccionActiva, etc. se mantienen igual)
  materiales: Material[] = [
    { id: 'U', nombre: 'Unidad', valor: 1, imageUrl: '../../../../assets/unidad1.png' },
    { id: 'D', nombre: 'Decena', valor: 10, imageUrl: '../../../../assets/decena.png' },
    { id: 'C', nombre: 'Centena', valor: 100, imageUrl: '../../../../assets/centena.png' },
    { id: 'UM', nombre: 'Unidad de Millar', valor: 1000, imageUrl: '../../../../assets/millar.png' },
  ];
  seccionActiva: 'igualdad1' | 'igualdad2' | null = null;
  contadores: { [key: string]: Contador } = {};
  valores: { [key: string]: number } = {};
  animarValor: string | null = null;

  constructor(private router: Router) {
    addIcons({closeCircle,closeCircleOutline,addCircle,removeCircle});
    this.reiniciar();
  }
  
  // 2. Usar los "Lifecycle Hooks" de Ionic
  async ionViewWillEnter() {
    // Bloquea la pantalla en horizontal cuando se entra a esta vista
    try {
        await ScreenOrientation.lock({ orientation: 'landscape' });
    } catch(error) {
        console.warn('Screen orientation lock failed:', error);
    }
  }

  async ionViewWillLeave() {
    // Desbloquea la orientación y la vuelve a poner en vertical al salir
    try {
        await ScreenOrientation.unlock();
        await ScreenOrientation.lock({ orientation: 'portrait-primary' });
    } catch(error) {
        console.warn('Screen orientation unlock failed:', error);
    }
  }

  // El resto de funciones (reiniciar, seleccionarSeccion, etc.) no necesitan cambios
  irAlMenu() { this.router.navigate(['/menu']); }
  reiniciar() { 
    this.seccionActiva = null;
    this.contadores = {
      igualdad1: { U: 0, D: 0, C: 0, UM: 0 },
      igualdad2: { U: 0, D: 0, C: 0, UM: 0 },
      diferencia: { U: 0, D: 0, C: 0, UM: 0 },
    };
    this.valores = { igualdad1: 0, igualdad2: 0, diferencia: 0 };
    this.calcularTodo();
  }
  seleccionarSeccion(seccion: 'igualdad1' | 'igualdad2' | null) {
    if (seccion) {
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
    this.valores['igualdad1'] = this.calcularValor(this.contadores['igualdad1']);
    this.valores['igualdad2'] = this.calcularValor(this.contadores['igualdad2']);
    this.valores['diferencia'] = Math.abs(this.valores['igualdad1'] - this.valores['igualdad2']);
    this.contadores['diferencia'] = this.descomponerValor(this.valores['diferencia']);
    for(const key of ['igualdad1', 'igualdad2', 'diferencia']) {
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
