import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
moment.locale('es');

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  titleDate = moment().format('[Hoy es ] dddd[, ] Do [de] MMMM[ de ] YYYY'); // Fecha actual para desplegar como título
  actualDate = moment().format("YYYY[-]M[-]D"); // Fecha a pasar al componente horario para búsquedas en BD

  changeDay: number = 0; // Variable que maneja la adición y sustracción de días 

  // pacientePermanente: boolean = true;

  constructor() { }

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

  // Buscar fecha específica mediante input type date
  searchBySpecificDate(date: string) {
    this.actualDate = moment(date).format("YYYY[-]M[-]D");
    this.titleDate = moment(date).format('dddd Do MMMM YYYY');
  }
}
