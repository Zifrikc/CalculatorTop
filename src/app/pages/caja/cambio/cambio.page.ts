import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonButton, IonIcon, IonContent, IonFooter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, refreshOutline, addCircle, removeCircle } from 'ionicons/icons';

// Definimos un tipo para los IDs de los materiales para ser más estrictos
type MaterialId = 'U' | 'D' | 'C' | 'UM';

// Definimos una interfaz para el objeto de material
interface Material {
  id: MaterialId;
  nombre: string;
  valor: number;
  imageUrl: string;
}

@Component({
  selector: 'app-cambio',
  templateUrl: './cambio.page.html',
  styleUrls: ['./cambio.page.scss'],
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
export class CambioPage {

  // Usamos la interfaz 'Material' para tipar el array
  materiales: Material[] = [
    // ACTUALIZACIÓN: Se añade la propiedad imageUrl con las URLs correspondientes
    { id: 'U', nombre: 'Unidad', valor: 1, imageUrl: 'https://res.cloudinary.com/tecnologi-zifrikc/image/upload/v1750047211/unidad_ideokk.png' },
    { id: 'D', nombre: 'Decena', valor: 10, imageUrl: 'https://res.cloudinary.com/tecnologi-zifrikc/image/upload/v1750047708/decena_n4owvo.png' },
    { id: 'C', nombre: 'Centena', valor: 100, imageUrl: 'https://res.cloudinary.com/tecnologi-zifrikc/image/upload/v1750047712/centena_etpbiy.png' },
    { id: 'UM', nombre: 'Unidad de Millar', valor: 1000, imageUrl: 'https://res.cloudinary.com/tecnologi-zifrikc/image/upload/v1750047736/millar_eqreqz.png' },
  ];

  seccionActiva: 'inicio' | 'aumenta' | 'disminuye' = 'inicio';
  contadores: { [key: string]: any } = {};
  valores: { [key: string]: number } = {};

  constructor() {
    this.reiniciar(); // Inicializa el estado al crear el componente
    addIcons({ homeOutline, refreshOutline, addCircle, removeCircle }); // Agrega los íconos usados en esta página
  }

  reiniciar() {
    this.seccionActiva = 'inicio';
    this.contadores = {
      inicio: { U: 0, D: 0, C: 0, UM: 0 },
      aumenta: { U: 0, D: 0, C: 0, UM: 0 },
      disminuye: { U: 0, D: 0, C: 0, UM: 0 },
      final: { U: 0, D: 0, C: 0, UM: 0 },
    };
    this.valores = {
        inicio: 0,
        aumenta: 0,
        disminuye: 0,
        final: 0
    };
    this.calcularTodo();
  }

  seleccionarSeccion(seccion: 'inicio' | 'aumenta' | 'disminuye') {
    this.seccionActiva = seccion;
  }

  // Ahora el tipo del parámetro coincide con el 'id' del material
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
    for (const seccion of ['inicio', 'aumenta', 'disminuye']) {
      this.valores[seccion] = this.calcularValor(this.contadores[seccion]);
    }

    // CORRECCIÓN: Usar notación de corchetes para evitar errores de firma de índice.
    this.valores['final'] = this.valores['inicio'] + this.valores['aumenta'] - this.valores['disminuye'];
    
    if (this.valores['final'] < 0) {
        this.valores['final'] = 0;
    }

    this.contadores['final'] = this.descomponerValor(this.valores['final']);
  }

  private calcularValor(contador: { U: number, D: number, C: number, UM: number }): number {
    return (contador.UM * 1000) + (contador.C * 100) + (contador.D * 10) + contador.U;
  }

  private descomponerValor(valor: number): { U: number, D: number, C: number, UM: number } {
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