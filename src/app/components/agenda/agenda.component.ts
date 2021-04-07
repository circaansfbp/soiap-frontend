import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
moment.locale('es');

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  fechaActual = moment().format('dddd Do MMMM YYYY'); // Formatear fecha?

  constructor() { }

  ngOnInit(): void {
    
  }

}
