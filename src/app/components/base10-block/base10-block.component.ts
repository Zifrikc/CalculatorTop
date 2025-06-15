import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-base10-block',
  templateUrl: './base10-block.component.html',
  styleUrls: ['./base10-block.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class Base10BlockComponent {
  // Recibe el tipo de bloque a mostrar ('unidad', 'decena', 'centena')
  @Input() type: 'unidad' | 'decena' | 'centena' = 'unidad';
  // Recibe la cantidad de bloques a dibujar
  @Input() count: number = 0;

  // Crea un array vacío del tamaño de 'count' para poder iterar en el template
  counter() {
    const blocks = Array.from({ length: this.count });
    console.log(`Base10BlockComponent [${this.type}] rendering ${this.count} blocks`);
    return blocks;
  }
}
