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
  actualDate = moment().format("YYYY[-]MM[-]DD"); // Fecha a pasar al componente horario para búsquedas en BD

  // Para manejar el display y búsquedas correctas de las fechas
  today = moment();

  constructor() { }

  ngOnInit(): void { }

  // Día siguiente
  nextDay() {
    let nextDay = moment(this.today).add(1, 'd');
    this.today = nextDay;

    this.actualDate = moment(this.today).format("YYYY[-]MM[-]DD");
    this.titleDate = moment(this.today).format("dddd Do MMMM YYYY");
  }

  // Día anterior
  previousDay() {
    let previousDay = moment(this.today).subtract(1, 'd');
    this.today = previousDay;

    this.actualDate = moment(this.today).format("YYYY[-]MM[-]DD");
    this.titleDate = moment(this.today).format("dddd Do MMMM YYYY");
  }

  // Búsqueda mediante input fecha
  searchBySpecificDate(date: string) {
    this.today = moment(date);

    this.actualDate = moment(this.today).format("YYYY[-]MM[-]DD");
    this.titleDate = moment(this.today).format("dddd Do MMMM YYYY");
  }
}
