import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonSpinner, IonGrid, IonRow, IonCol, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonSpinner, IonGrid, IonRow, IonCol, IonText]
})
export class HomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // Creamos un temporizador para simular una pantalla de carga.
    // Después de 3000 milisegundos (3 segundos), navegará a la página del menú.
    setTimeout(() => {
      this.router.navigateByUrl('/menu');
    }, 4000);
  }

}
