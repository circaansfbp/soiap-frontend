import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';
moment.locale('es');

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  titleDate = moment().format('dddd Do MMMM YYYY'); // Fecha actual para desplegar como título
  actualDate = moment().format("YYYY[-]M[-]D"); // Fecha a pasar al componente horario para búsquedas en BD

  changeDay: number = 0; // Variable que maneja la adición y sustracción de días 

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.changeDay = 0;
  }

  // Día siguiente
  nextDay() {
    this.changeDay++;
    let next = moment().add(this.changeDay, 'd');
    this.actualDate = next.format("YYYY[-]M[-]D");
    this.titleDate = next.format('dddd Do MMMM YYYY');
  }

  // Día anterior
  previosDay() {
    this.changeDay--;
    let previous = moment().add(this.changeDay, 'd');
    this.actualDate = previous.format("YYYY[-]M[-]D");
    this.titleDate = previous.format('dddd Do MMMM YYYY');
  }
}
