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

  horas: string[] = ["8:00", "8:50", "9:40", "10:30", "11:20", "12:10", "13:00",
    "15:00", "15:50", "16:40", "17:30", "18:20", "19:10", "20:00"];
  
  fechaActual = moment().format('dddd Do MMMM YYYY'); // Formatear fecha?

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  nuevoHorario() {
    this.router.navigate(['nuevo-horario']);
  }

}
