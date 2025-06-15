import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonIcon, IonGrid, IonRow, IonCol, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';

import { BlockType } from '../../shared/block-type'; // Asegúrate que la ruta coincida con tu estructura

export interface BlockChangeEvent {
  type: BlockType;
  action: 'add' | 'remove';
}

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonLabel]
})
export class ControlPanelComponent {
  @Output() change = new EventEmitter<BlockChangeEvent>();

  // Declaramos el arreglo con tipos literales seguros
  readonly blockTypes: BlockType[] = ['unidad', 'decena', 'centena'];

  constructor() {
    addIcons({ addCircleOutline, removeCircleOutline });
  }

  emitChange(type: BlockType, action: 'add' | 'remove') {
    this.change.emit({ type, action });
  }
}
